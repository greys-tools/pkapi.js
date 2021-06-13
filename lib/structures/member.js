import * as tc from 'tinycolor2';
import validUrl from 'valid-url';

import ROUTES from '../routes.js';

function equal(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	a.sort(); b.sort;

	for (var i = 0; i < a.length; ++i) {
	if (a[i] !== b[i]) return false;
	}
	return true;
}

const KEYS = {
	id: {
		test: (i) => i?.length,
		err: "ID must be present",
		transform: (i) => i.toLowerCase()
	},
	name: {
		test: (n) => !n.length || n.length <= 50,
		err: "Name must be 50 characters or less"
	},
	display_name: {
		test: (n) => !n.length || n.length <= 50,
		err: "Display name must be 50 characters or less"
	},
	description: {
		test: (d) => !d.length || d.length < 1000,
		err: "Description must be 1000 characters or less"
	},
	pronouns: {
		test: (p) => !n.length || p.length <= 100,
		err: "Pronouns must be 100 characters or less"
	},
	avatar_url: {
		test: (a) => {
			if(!validUrl.isWebUri(a)) return false;
			axios.head(a).then(data => {
				if(data.headers["content-type"]?.startsWith("image")) return false;
				return true;
			})
			.catch(e => { return false });
		}
	},
	color: {
		test: (c) => { c = tinycolor(c); return c.isValid() },
		err: "Color must be a valid hex code",
		transform: (c) => { c = tinycolor(c); return c.toHex() }
	},
	birthday: {
		test: (d) => { d = new Date(d); return !isNaN(d.valueOf())},
		err: "Birthday must be a valid date",
		transform: (d) => {
			var date = new Date(d);
			if(date.getFullYear() == 2001 && !d.match(/\d{4}/g)) date.setFullYear(2004);
			if(data.getDate() == 1 && )
			return date;
		},
		init: (d) => new Date(d)
	},
	proxy_tags: {
		test: (p) => typeof p == "object" && !p.find(t => typeof t != "object" || !equal(Object.keys(t), ['prefix', 'suffix'])),
		err: "Proxy tags must be an array of objects containing 'prefix' and 'suffix' keys"
	},
	keep_proxy: {
		test: (v) => typeof v == "boolean",
		err: "Keep proxy must be a boolean (true or false)"
	},
	created: {
		init: (d) => new Date(d)
	},
	visibility: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "visibility must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	name_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Name privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	description_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Description privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	avatar_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Avatar privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	birthday_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Birthday privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	pronoun_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Pronoun privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	metadata_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Metadata privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
}

export default class Member {
	#api;
	
	constructor(api, data) {
		this.#api = api;
		for(var k in data) {
			if(KEYS[k]) {
				if(KEYS[k].init) data[k] = KEYS[k].init(data[k]);
				this[k] = data[k];
			}
		}
	}

	async patch(token) {
		token = token || this.#api.token;
		if(!token) throw new Error("PATCH requires a token/auth");

		try {
			var body = await this.verify();
			var resp = await this.#api.handle('patch', ROUTES.PATCH_MEMBER(this.id), {
				token,
				body
			})
		} catch(e) {
			throw new Error(`Patching member ${this.id} failed: ${e.message}`)
		}

		for(var k in resp.data) if(KEYS[k]) this[k] = resp.data[k];
		return this;
	}

	async delete(token) {
		if(!token) throw new Error("DELETE requires a token/auth");

		try {
			var resp = await this.#api.handle('delete', ROUTES.DELETE_MEMBER(this.id), {token});
		} catch(e) {
			throw new Error(`Deleting member ${this.id} failed: ${e.message}`);
		} finally {
			if(resp && resp.status != 204) throw new Error(resp.data);
		}

		return null;
	}

	async verify() {
		var mem = {};
		var errors = [];
		for(var k in KEYS) {
			if(this[k] == null || this[k] == undefined) {
				mem[k] = this[k];
				continue;
			}
			var test = true;
			if(KEYS[k].test) test = await KEYS[k].test(this[k]);
			if(!test) {
				errors.push(KEYS[k].err);
			}
			if(KEYS[k].transform) this[k] = KEYS[k].transform(this[k]);
			mem[k] = this[k];
		}

		if(errors.length) throw new Error(errors.join("\n"));

		return mem;
	}
}
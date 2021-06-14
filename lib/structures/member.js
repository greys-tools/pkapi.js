import * as tc from 'tinycolor2';
import validUrl from 'valid-url';
import axios from 'axios';
import * as chrono from 'chrono-node';

const parser = chrono.casual.clone();
parser.refiners.push({
	refine: (ctx, res) => {
		res.forEach(r => {
			if(!r.start.isCertain('year')) r.start.assign('year', 2004)
		})

		return res;
	}
})

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

function formatDate(d) {
	var y = d.getFullYear();
	var m = ("0" + (d.getMonth() + 1)).slice(-2);
	var d = ("0" + (d.getDate())).slice(-2);

	return `${y}-${m}-${d}`;
}

function privacy(v) {
	if(['private', 'public'].includes(v)) return v;
	return v ? 'public' : 'private';
}

const KEYS = {
	id: {},
	name: {
		test: (n) => n == undefined || (n?.length && n.length <= 50),
		err: "Name must be present and 50 characters or less"
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
		test: (p) => !p.length || p.length <= 100,
		err: "Pronouns must be 100 characters or less"
	},
	color: {
		test: (c) => { c = tinycolor(c); return c.isValid() },
		err: "Color must be a valid hex code",
		transform: (c) => { c = tinycolor(c); return c.toHex() }
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
	birthday: {
		test: (d) => { d = new Date(parser.parseDate(d)); return !isNaN(d.valueOf())},
		err: "Birthday must be a valid date",
		transform: (d) => {
			if(!d) return d;
			var date = parser.parseDate(d);
			return formatDate(date);
		},
		init: (d) => d ? new Date(d) : d
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
		transform: privacy
	},
	name_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Name privacy must be 'public', 'private', or null",
		transform: privacy
	},
	description_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Description privacy must be 'public', 'private', or null",
		transform: privacy
	},
	avatar_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Avatar privacy must be 'public', 'private', or null",
		transform: privacy
	},
	birthday_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Birthday privacy must be 'public', 'private', or null",
		transform: privacy
	},
	pronoun_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Pronoun privacy must be 'public', 'private', or null",
		transform: privacy
	},
	metadata_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Metadata privacy must be 'public', 'private', or null",
		transform: privacy
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
		var data = await this.#api.patchMember({...this, token});
		for(var k in data) if(KEYS[k]) this[k] = data[k];
		return this;
	}

	async delete(token) {
		return this.#api.deleteMember({id: this.id, token});
	}

	async verify() {
		var mem = {};
		var errors = [];
		for(var k in KEYS) {
			if(this[k] == null) {
				mem[k] = this[k];
				continue;
			}
			if(this[k] == undefined) continue;
			
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
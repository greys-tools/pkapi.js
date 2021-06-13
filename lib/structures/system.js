import * as util from 'util';
import * as tc from 'tinycolor2';
import { rawTimeZones } from '@vvo/tzdb';
import validUrl from 'valid-url';

import ROUTES from '../routes.js';
import Member from './member.js';

const KEYS = {
	id: {
		test: (i) => i?.length,
		err: "ID must be present",
		transform: (i) => i.toLowerCase()
	},
	name: {
		test: (n) => !n.length || n.length <= 100,
		err: "Name must be 100 characters or less"
	},
	description: {
		test: (d) => !d.length || d.length < 1000,
		err: "Description must be 1000 characters or less"
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
	tag: {},
	// color: {
		// test: (c) => { c = tinycolor(c); return c.isValid() },
		// err: "Color must be a valid hex code",
		// transform: (c) => { c = tinycolor(c); return c.toHex() }
	// },
	tz: {
		test: (t) => rawTimeZones.find(z => [z.name.toLowerCase(), z.abbreviation.toLowerCase()].includes(t.toLowerCase())),
		err: "Timezone must be valid",
		transform: (tz) => {
			var raw = rawTimeZones.find(z => [z.name.toLowerCase(), z.abbreviation.toLowerCase()].includes(t.toLowerCase()));
			return raw.name;
		}
	},
	created: {
		init: (d) => new Date(d)
	},
	description_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Description privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	member_list_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Member list privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	front_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Front privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	front_history_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Front history privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	front_history_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Front history privacy must be 'public', 'private', or null",
		transform: (v) => (v == true || v == null) ? "public" : "private"
	},
	// group_list_privacy: {
		// test: (b) => [true, false, "private", "public", null].includes(b),
		// err: "Group list privacy must be 'public', 'private', or null",
		// transform: (v) => (v == true || v == null) ? "public" : "private"
	// },
}

export default class System {
	#api;
	
	constructor(api, data) {
		this.#api = api;
		if(!data?.id) throw new Error("System must at least have an ID.")
		for(var k in data) {
			if(KEYS[k]) {
				if(KEYS[k].init) data[k] = KEYS[k].init(data[k]);
				this[k] = data[k];
			}
		}
		if(data.members) {
			data.members = data.mambers.map(m => m instanceof Member ? m : new Member(api, m));
			this.members = new Map();
			for(var i of data.members) this.members.set(i.id, i);
		}
	}

	async patch(token) {
		if(!token && !this.#api.token) throw new Error("PATCHing requires a token/auth.");

		try {
			var body = await this.verify();
			var resp = await this.#api.handle('patch', ROUTES.PATCH_SYSTEM(), {
				token,
				body
			})
		} catch(e) {
			throw new Error(`Patching system ${this.id} failed: ${e.message}`)
		}

		for(var k in resp.data) if(KEYS[k]) this[k] = resp.data[k];
		return this;
	}

	async getMember(mid, token) {
		try {
			var resp = await this.#api.handle('get', ROUTES.GET_MEMBER(mid), {token});
			if(resp.status == 200) var mem = new Member(this.#api, resp.data);
		} catch(e) {
			throw new Error(e.message || e);
		} finally {
			if(resp.status != 200) throw new Error(resp.data);
		}

		return mem;
	}

	async getMembers(token) {
		try {
			var resp = await this.#api.handle('get', ROUTES.GET_MEMBERS(this.id), {token})
		} catch(e) {
			throw new Error(`Getting members for system ${this.id} failed: ${e.message}`)
		} finally {
			if(resp.status != 200)
				throw new Error(resp.data);
		}

		var members = new Map(resp.data.map(m => [m.id, new Member(this.#api, m)]));
		return members;
	}

	async createMember(token, data) {
		var m = new Member({id: 'new', ...data});
		try {
			m = m.verify();
		} catch(e) {
			throw new Error(e);
		}
	}

	async getFronters(token) {
		try {
			var resp = await this.#api.handle('get', ROUTES.GET_FRONTERS(this.id), {token})
		} catch(e) {
			throw new Error(`Getting fronters for system ${this.id} failed: ${e.message}`)
		} finally {
			if(![200, 404].includes(resp.status) || resp.data.includes?.("not found"))
				throw new Error(resp.data);
		}

		if(typeof resp.data == "string") return null;

		var fronters = {
			timestamp: new Date(resp.data.timestamp),
			members: new Map(resp.data.members.map(m => [m.id, new Member(this.#api, m)]))
		}
		return fronters;
	}

	async getSwitches(token, raw = false) {
		try {
			var resp = await this.#api.handle('get', ROUTES.GET_SWITCHES(this.id), {token})
			var mresp = await this.#api.handle('get', ROUTES.GET_MEMBERS(this.id), {token})
		} catch(e) {
			throw new Error(`Getting switches for system ${this.id} failed: ${e.message}`)
		} finally {
			if(![200, 404].includes(resp.status) || resp.data.includes?.("not found"))
				throw new Error(resp.data);
		}

		if(typeof resp.data == "string") return null;;
		var members = new Map(mresp.data.map(m => [m.id, new Member(this.#api, m)]));
		var switches = [];
		for(var sw of resp.data) {
			switches.push({
				timestamp: new Date(sw.timestamp),
				members: raw ? sw.members : new Map(sw.members.map(m => [m, members.get(m)]))
			})
		}

		return switches;
	}

	async verify() {
		var sys = {};
		var errors = [];
		for(var k in KEYS) {
			var test = true;
			if(KEYS[k].test) test = await KEYS[k].test(this[k]);
			if(!test) {
				errors.push(KEYS[k].err);
			}
			if(KEYS[k].transform) this[k] = KEYS[k].transform(this[k]);
			sys[k] = this[k];
		}

		if(errors.length) throw new Error(errors.join("\n"));

		return sys;
	}
}
const tc = require('tinycolor2');
const axios = require('axios');
const { rawTimeZones } = require('@vvo/tzdb');
const validUrl = require('valid-url');

function findTz(t) {
	var raw = rawTimeZones.find(z => {
		return ([
			z.name.toLowerCase(),
			z.abbreviation.toLowerCase(),
			z.alternativeName.toLowerCase()
		].includes(t.toLowerCase().replace('utc', 'gmt')));
	})

	return raw;
}

function privacy(v) {
	if(['private', 'public'].includes(v)) return v;
	return v ? 'public' : 'private';
}

const KEYS = {
	id: {},
	name: {
		test: (n) => !n.length || n.length <= 100,
		err: "Name must be 100 characters or less"
	},
	description: {
		test: (d) => !d.length || d.length < 1000,
		err: "Description must be 1000 characters or less"
	},
	tag: {},
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
	// color: {
		// test: (c) => { c = tinycolor(c); return c.isValid() },
		// err: "Color must be a valid hex code",
		// transform: (c) => { c = tinycolor(c); return c.toHex() }
	// },
	tz: {
		test: (t) => findTz(t),
		err: "Timezone must be valid",
		transform: (t) => {
			var raw = findTz(t)
			return raw.abbreviation.replace('GMT','UTC');
		}
	},
	created: {
		init: (d) => new Date(d)
	},
	description_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Description privacy must be 'public', 'private', or null",
		transform: privacy
	},
	member_list_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Member list privacy must be 'public', 'private', or null",
		transform: privacy
	},
	front_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Front privacy must be 'public', 'private', or null",
		transform: privacy
	},
	front_history_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Front history privacy must be 'public', 'private', or null",
		transform: privacy
	},
	// group_list_privacy: {
		// test: (b) => [true, false, "private", "public", null].includes(b),
		// err: "Group list privacy must be 'public', 'private', or null",
		// transform: privacy
	// },
}

module.exports = class System {
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
		var data = await this.#api.patchSystem({...this, token});
		for(var k in data) if(KEYS[k]) this[k] = data[k];
		return this;
	}

	async getMember(id, token) {
		return this.#api.getMember({id, token});
	}

	async getMembers(token) {
		var mems = await this.#api.getMembers({id: this.id, token});
		if(this.members) this.members = mems;
		return mems
	}

	async createMember(data) {
		var mem = await this.#api.createMember(data);
		if(this.members) this.members.set(mem.id, mem);
		return mem;
	}

	async createSwitch(data) {
		return this.#api.createSwitch(data);
	}

	async getSwitches(token, raw = false) {
		var switches = await this.#api.getSwitches({id: this.id, token, raw});
		if(this.switches) this.switches = switches;
		return switches;
	}

	async getFronters(token) {
		var fronters = await this.#api.getFronters({id: this.id, token})
		if(this.fronters) this.fronters = fronters;
		return fronters;
	}

	async verify() {
		var sys = {};
		var errors = [];
		for(var k in KEYS) {
			var test = true;
			if(this[k] == null) {
				sys[k] = this[k];
				continue;
			}
			if(this[k] == undefined) continue;
			
			if(KEYS[k].test) test = await KEYS[k].test(this[k]);
			if(!test) {
				errors.push(KEYS[k].err);
				continue;
			}
			if(KEYS[k].transform) this[k] = KEYS[k].transform(this[k]);
			sys[k] = this[k];
		}

		if(errors.length) throw new Error(errors.join("\n"));

		console.log(sys)
		return sys;
	}
}
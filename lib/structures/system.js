const tc = require('tinycolor2');
const axios = require('axios');
const validUrl = require('valid-url');
const { validatePrivacy } = require('../utils');

const pKeys = [
	'description_privacy',
	'member_list_privacy',
	'group_list_privacy',
	'front_privacy',
	'front_history_privacy'
]

const KEYS = {
	id: { },
	uuid: { },
	name: {
		test: (n) => !n.length || n.length <= 100,
		err: "Name must be 100 characters or less"
	},
	description: {
		test: (d) => !d.length || d.length < 1000,
		err: "Description must be 1000 characters or less"
	},
	tag: { },
	avatar_url: {
		test: async (a) => {
			if(!validUrl.isWebUri(a)) return false;
			try {
				var data = await axios.head(a);
				if(data.headers["content-type"]?.startsWith("image")) return true;
				return false;
			} catch(e) { return false; }
		},
		err: "Avatar URL must be a valid image and less than 256 characters"
	},
	banner: {
		test: async (a) => {
			if(!validUrl.isWebUri(a)) return false;
			try {
				var data = await axios.head(a);
				if(data.headers["content-type"]?.startsWith("image")) return true;
				return false;
			} catch(e) { return false; }
		},
		err: "Banner URL must be a valid image and less than 256 characters"
	},
	color: {
		test: (c) => { c = tc(c); return c.isValid() },
		err: "Color must be a valid hex code",
		transform: (c) => { c = tc(c); return c.toHex() }
	},
	created: {
		init: (d) => new Date(d)
	},
	privacy: {
		transform: (o) => validatePrivacy(pKeys, o)
	}
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
		var data = await this.#api.patchSystem({system: this.id, ...this, token});
		for(var k in data) if(KEYS[k]) this[k] = data[k];
		return this;
	}

	async createMember(data) {
		var mem = await this.#api.createMember(data);
		if(!this.members) this.members = new Map();
		this.members.set(mem.id, mem);
		return mem;
	}

	async getMember(member, token) {
		var mem = await this.#api.getMember({member, token});
		if(!this.members) this.members = new Map();
		this.members.set(mem.id, mem);
		return mem;
	}

	async getMembers(token) {
		var mems = await this.#api.getMembers({system: this.id, token});
		this.members = mems;
		return mems;
	}

	async deleteMember(member, token) {
		await this.#api.deleteMember({member, token});
		if(this.members) this.members.delete(member);
		return;
	}

	async createGroup(data) {
		var group = await this.#api.createGroup(data);
		if(!this.groups) this.groups = new Map();
		this.groups.set(group.id, group);
		return group;
	}

	async getGroups(token) {
		var groups = await this.#api.getGroups({system: this.id, token});
		this.groups = groups;
		return groups;
	}

	async getGroup(group, token) {
		var grp = await this.#api.getGroups({system: this.id, group, token});
		if(!this.groups) this.groups = new Map();
		this.groups.set(grp.id, grp)
		return grp;
	}

	async deleteGroup(group, token) {
		await this.#api.deleteGroup({group, token});
		if(this.groups) this.groups.delete(group);
		return;
	}

	async createSwitch(data) {
		return this.#api.createSwitch(data);
	}

	async getSwitches(token, raw = false) {
		var switches = await this.#api.getSwitches({system: this.id, token, raw});
		this.switches = switches;
		return switches;
	}

	async getFronters(token) {
		var fronters = await this.#api.getFronters({system: this.id, token})
		this.fronters = fronters;
		return fronters;
	}

	async deleteSwitch(switchid, token) {
		await this.#api.deleteSwitch({switch: switchid, token});
		if(this.switches) this.switches.delete(switchid);
		return;
	}

	async getSettings(token) {
		var settings = await this.#api.getSystemSettings({token});
		this.config = settings;
		return settings;
	}

	async getGuildSettings(guild, token) {
		var settings = await this.#api.getSystemGuildSettings({guild, token});
		if(!this.settings) this.settings = new Map();
		this.settings.set(guild, settings);
		return settings;
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

		return sys;
	}
}
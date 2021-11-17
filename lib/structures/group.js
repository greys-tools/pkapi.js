const axios = require('axios');
const validUrl = require('valid-url');
const { validatePrivacy } = require('../utils');

const pKeys = [
	'description_privacy',
	'icon_privacy',
	'list_privacy',
	'visibility'
]

const KEYS = {
	id: { },
	uuid: { },
	name: {
		test: (n) => !n.length || n.length <= 100,
		err: "Name must be 100 characters or less"
	},
	display_name: {
		test: (n) => !n.length || n.length <= 100,
		err: "Display name must be 100 characters or less"
	},
	description: {
		test: (d) => !d.length || d.length < 1000,
		err: "Description must be 1000 characters or less"
	},
	icon: {
		test: async (a) => {
			if(!validUrl.isWebUri(a)) return false;
			try {
				var data = await axios.head(a);
				if(data.headers["content-type"]?.startsWith("image")) return true;
				return false;
			} catch(e) { return false; }
		},
		err: "Icon URL must be a valid image and less than 256 characters"
	},
	banner: {
		test: async (a) => {
			if(a.length > 256) return false;
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

module.exports = class Group {
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
		var data = await this.#api.patchGroup({group: this.id, ...this, token});
		for(var k in data) if(KEYS[k]) this[k] = data[k];
		return this;
	}

	async delete(token) {
		return await this.#api.deleteGroup({group: this.id, token});
	}

	async getMembers(token) {
		var mems = await this.#api.getGroupMembers({group: this.id, token});
		this.members = mems;
		return mems;
	}

	async addMembers(members, token) {
		await this.#api.addGroupMembers({group: this.id, members, token});
		var mems = await this.getMembers(token);
		this.members = mems;
		return mems;
	}

	async removeMembers(members, token) {
		await this.#api.removeGroupMembers({group: this.id, members, token});
		var mems = await this.getMembers(token);
		this.members = mems;
		return mems;
	}

	async setMembers(members, token) {
		await this.#api.setGroupMembers({group: this.id, members, token});
		var mems = await this.getMembers(token);
		this.members = mems;
		return mems;
	}

	async verify() {
		var group = {};
		var errors = [];
		for(var k in KEYS) {
			var test = true;
			if(this[k] == null) {
				group[k] = this[k];
				continue;
			}
			if(this[k] == undefined) continue;
			
			if(KEYS[k].test) test = await KEYS[k].test(this[k]);
			if(!test) {
				errors.push(KEYS[k].err);
				continue;
			}
			if(KEYS[k].transform) this[k] = KEYS[k].transform(this[k]);
			group[k] = this[k];
		}

		if(errors.length) throw new Error(errors.join("\n"));

		return group;
	}
}
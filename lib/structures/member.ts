import tc from 'tinycolor2';
import validUrl from 'valid-url';
import axios from 'axios';
import * as chrono from 'chrono-node';
import {
	validatePrivacy,
	formatDate
} from '../utils';

const parser = chrono.casual.clone();
parser.refiners.push({
	refine: (ctx, res) => {
		res.forEach(r => {
			if(!r.start.isCertain('year')) r.start.assign('year', 2004)
		})

		return res;
	}
})

function hasKeys(obj: any, keys: Array<string>) {
	if(typeof obj !== "object") return false;
	var okeys = Object.keys(obj);

	for(var k of keys) if(!okeys.includes(k)) return false;

	return true;
}

const enum MemberPrivacyKeys {
	Visibility = 	'visibility',
	Name = 			'name_privacy',
	Description = 	'description_privacy',
	Birthday = 		'birthday_privacy',
	Pronouns = 		'pronoun_privacy',
	Avatar = 		'avatar_privacy',
	Metadata = 		'metadata_privacy'
}

const pKeys = [
	MemberPrivacyKeys.Visibility,
	MemberPrivacyKeys.Name,
	MemberPrivacyKeys.Description,
	MemberPrivacyKeys.Birthday,
	MemberPrivacyKeys.Pronouns,
	MemberPrivacyKeys.Avatar,
	MemberPrivacyKeys.Metadata
]

export interface MemberPrivacy {
	visibility?: string;
	name_privacy?: string;
	description_privacy?: string;
	birthday_privacy?: string;
	pronoun_privacy?: string;
	avatar_privacy?: string;
	metadata_privacy?: string;
}

const KEYS = {
	id: { },
	uuid: { },
	system: { },
	name: {
		test: (n) => {
			console.log(n);
			return n != undefined && (n.length && n.length <= 100);
		},
		err: "Name must be present and 100 characters or less",
		required: true
	},
	display_name: {
		test: (n) => !n.length || n.length <= 100,
		err: "Display name must be 100 characters or less"
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
		test: (c) => { c = tc(c); return c.isValid() },
		err: "Color must be a valid hex code",
		transform: (c) => { c = tc(c); return c.toHex() }
	},
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
	birthday: {
		test: (d) => {
			if(d instanceof Date) return true;
			d = new Date(parser.parseDate(d)); return !isNaN(d.valueOf())
		},
		err: "Birthday must be a valid date",
		transform: (d) => {
			if(!d) return d;
			var date;
			if(!(d instanceof Date)) date = parser.parseDate(d);
			else date = d;
			return formatDate(date);
		},
		init: (d) => d ? new Date(d) : d
	},
	proxy_tags: {
		test: (p) => typeof p == "object" && !p.some(t => !hasKeys(t, ['prefix', 'suffix'])),
		err: "Proxy tags must be an array of objects containing 'prefix' and 'suffix' keys"
	},
	keep_proxy: {
		test: (v) => typeof v == "boolean",
		err: "Keep proxy must be a boolean (true or false)"
	},
	created: {
		init: (d) => new Date(d)
	},
	privacy: {
		transform: (o) => validatePrivacy(pKeys, o)
	}
}

export interface ProxyTags {
	prefix?: string;
	suffix?: string;
}

export default class Member {
	#api;

	id: string;
	uuid: string;
	system: string;
	name: string;
	display_name?: string;
	description?: string;
	pronouns?: string;
	color?: string;
	avatar_url?: string;
	banner?: string;
	birthday?: Date | string;
	proxy_tags?: Array[ProxyTags];
	keep_proxy?: boolean;
	created: Date | string;
	privacy: MemberPrivacy;
	
	constructor(api, data: Partial<Member>) {
		this.#api = api;
		for(var k in data) {
			if(KEYS[k]) {
				if(KEYS[k].init) data[k] = KEYS[k].init(data[k]);
				this[k] = data[k];
			}
		}
	}

	async patch(token?: string) {
		var data = await this.#api.patchMember({member: this.id, ...this, token});
		for(var k in data) if(KEYS[k]) this[k] = data[k];
		return this;
	}

	async delete(token?: string) {
		return await this.#api.deleteMember({member: this.id, token});
	}

	async getGroups(token?: string) {
		var groups = await this.#api.getMemberGroups({member: this.id, token});
		this.groups = groups;
		return groups;
	}

	async addGroups(groups: Array<string>, token?: string) {
		await this.#api.addMemberGroups({member: this.id, groups, token});
		var grps = await this.getGroups(token);
		this.groups = grps;
		return grps;
	}

	async removeGroups(groups: Array<string>, token?: string) {
		await this.#api.removeMemberGroups({member: this.id, groups, token});
		var grps = await this.getGroups(token);
		this.groups = grps;
		return grps;
	}

	async setGroups(groups: Array<string>, token?: string) {
		await this.#api.setMemberGroups({member: this.id, groups, token});
		var grps = await this.getGroups(token);
		this.groups = grps;
		return grps;
	}

	async getGuildSettings(guild: string, token?: string) {
		var settings = await this.#api.getMemberGuildSettings({member: this.id, guild, token});
		if(!this.settings) this.settings = new Map();
		this.settings.set(guild, settings);
		return settings;
	}

	async verify() {
		var mem = {};
		var errors = [];
		for(var k in KEYS) {
			if(!KEYS[k].required) {
				if(this[k] == null) {
					mem[k] = this[k];
					continue;
				}
				if(this[k] == undefined) continue;
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
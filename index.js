const axios = require('axios');

const System 				= require('./lib/structures/system');
const Member 				= require('./lib/structures/member');
const Group 				= require('./lib/structures/group');
const Switch 				= require('./lib/structures/switch');
const Message 				= require('./lib/structures/message');
const SystemSettings 		= require('./lib/structures/systemSettings');
const SystemGuildSettings 	= require('./lib/structures/systemGuildSettings');
const MemberGuildSettings 	= require('./lib/structures/memberGuildSettings');

const APIError = require('./lib/structures/apiError');

const ROUTES = require('./lib/routes');

class PKAPI {
	#token;
	#inst;
	#_base;
	#_version;

	#version_warning = false;
	
	constructor(data = {}) {
		this.#_base = data.base_url || 'https://api.pluralkit.me';
		this.#_version = data.version || 2;
		this.#token = data.token;

		this.#inst = axios.create({
			validateStatus: (s) => s < 300 && s > 100,
			baseURL: `${this.#_base}/v${this.#_version}`
		})
	}

	/*
	**			SYSTEM FUNCTIONS
	*/
	
	async getSystem(data = {}) {
		var token = this.#token || data.token;
		if(data.system == null && !token) throw new Error('Must provide a token or ID.');
		var sys;
		var resp;
		try {
			if(token) {
				resp = await this.handle(ROUTES[this.#_version].GET_OWN_SYSTEM(), {token});
				sys = new System(this, resp.data);
			} else {
				if(data.system.length > 5) resp = await this.handle(ROUTES[this.#_version].GET_ACCOUNT(data.system));
				else resp = await this.handle(ROUTES[this.#_version].GET_SYSTEM(data.system));
				sys = new System(this, resp.data);
			}

			if(data.fetch) {
				if(data.fetch.includes("members")) sys.members = await sys.getMembers(token);
				if(data.fetch.includes("fronters")) sys.fronters = await sys.getFronters(token);
				if(data.fetch.includes("switches")) sys.switches = await sys.getSwitches(token, data.raw);
				if(data.fetch.includes("groups")) sys.groups = await sys.getGroups(token);
				if(data.fetch.includes("settings")) sys.config = await sys.getSettings(token);
			}
		} catch(e) {
			throw e;
		}

		return sys;
	}

	async getAccount(data = {}) {
		return await this.getSystem(data);
	}

	async patchSystem(data = {}) {
		var token = this.#token || data.token;
		if(!token) throw new Error("PATCH requires a token.");

		try {
			var sys = data instanceof System ? data : new System(this, data);
			var body = await sys.verify();
			sys = await this.handle(ROUTES[this.#_version].PATCH_SYSTEM(), {token, body});
		} catch(e) {
			throw e;
		}

		return new System(this, sys.data);
	}

	async getSystemSettings(data = {}) {
		if(this.version < 2) throw new Error("System settings are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error("Getting system settings requires a token.");

		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_SYSTEM_SETTINGS(), {token});
		} catch(e) {
			throw e;
		}

		return new SystemSettings(this, resp.data);
	}

	async patchSystemSettings(data = {}) {
		if(this.version < 2) throw new Error("System settings are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error("PATCH requires a token.");

		try {
			var settings = data instanceof SystemSettings ? data : new SystemSettings(this, data);
			var body = await settings.verify();
			settings = await this.handle(
				ROUTES[this.#_version].PATCH_SYSTEM_SETTINGS(),
				{token, body}
			);
		} catch(e) {
			throw e;
		}

		return new SystemSettings(this, settings.data);
	}

	async getSystemGuildSettings(data = {}) {
		if(this.version < 2) throw new Error("Guild settings are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error("Getting guild settings requires a token.");
		if(!data.guild) throw new Error("Must provide a guild ID.");

		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_SYSTEM_GUILD_SETTINGS(data.guild), {token});
		} catch(e) {
			throw e;
		}

		return new SystemGuildSettings(this, {...resp.data, guild: data.guild});
	}

	async patchSystemGuildSettings(data = {}) {
		if(this.version < 2) throw new Error("Guild settings are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error("PATCH requires a token.");
		if(!data.guild) throw new Error("Must provide a guild ID.");

		try {
			var settings = data instanceof SystemGuildSettings ? data : new SystemGuildSettings(this, data);
			var body = await settings.verify();
			settings = await this.handle(
				ROUTES[this.#_version].PATCH_SYSTEM_GUILD_SETTINGS(data.guild),
				{token, body}
			);
		} catch(e) {
			throw e;
		}

		return new SystemGuildSettings(this, {...settings.data, guild: data.guild});
	}

	/*
	**			MEMBER FUNCTIONS
	*/

	async createMember(data = {}) {
		var token = this.#token || data.token;
		if(!token) throw new Error("POST requires a token.");

		try {
			var mem = new Member(this, data);
			var body = await mem.verify();
			mem = await this.handle(ROUTES[this.#_version].ADD_MEMBER(), {token, body});
		} catch(e) {
			throw e;
		}

		return new Member(this, mem.data);
	}

	async getMember(data = {}) {
		if(data.member == null) throw new Error('Must provide a member ID.');
		var token = this.#token || data.token;
		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_MEMBER(data.member), {token});
		} catch(e) {
			throw e;
		}

		return new Member(this, resp.data);
	}

	async getMembers(data = {}) {
		var token = this.#token || data.token;
		var system = data.system ?? '@me';
		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_MEMBERS(system), {token});
		} catch(e) {
			throw e;
		}

		var mems = resp.data.map(m => [m.id, new Member(this, m)]);
		return new Map(mems);
	}

	async patchMember(data = {}) {
		if(data.member == null) throw new Error("Must provide a member ID.");
		var token = this.#token || data.token;
		if(!token) throw new Error("PATCH requires a token.");

		try {
			var mem = data instanceof Member ? data : new Member(this, data);
			var body = await mem.verify();
			mem = await this.handle(ROUTES[this.#_version].PATCH_MEMBER(data.member), {token, body});
		} catch(e) {
			throw e;
		}

		return new Member(this, mem.data);
	}

	async deleteMember(data = {}) {
		if(data.member == null) throw new Error('Must provide a member ID.');
		var token = this.#token || data.token;
		if(!token) throw new Error("DELETE requires a token.");
		try {
			var resp = await this.handle(ROUTES[this.#_version].DELETE_MEMBER(data.member), {token});
		} catch(e) {
			throw e;
		}

		return null;
	}

	async getMemberGroups(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		if(!data.member) throw new Error('Must provide a member ID.');

		try {
			var resp = await this.handle(
				ROUTES[this.#_version].GET_MEMBER_GROUPS(data.member),
				{token}
			)
		} catch(e) {
			throw e;
		}

		var groups = resp.data.map(g => [g.id, new Group(this, g)]);
		return new Map(groups);
	}

	async addMemberGroups(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error('POST requires a token.');
		if(!data.member) throw new Error('Must provide a member ID.');
		if(!data.groups || !Array.isArray(data.groups))
			throw new Error('Must provide an array of groups.');
		var groups = data.groups;
		if(groups.find(g => g instanceof Group)) groups = groups.map(g => g.id ?? g);

		try {
			var resp = await this.handle(
				ROUTES[this.#_version].ADD_MEMBER_GROUPS(data.member),
				{token, body: groups}
			)
		} catch(e) {
			throw e;
		}

		return;
	}

	async removeMemberGroups(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error('POST requires a token.');
		if(!data.member) throw new Error('Must provide a member ID.');
		if(!data.groups || !Array.isArray(data.groups))
			throw new Error('Must provide an array of groups.');
		var groups = data.groups;
		if(groups.find(g => g instanceof Group)) groups = groups.map(g => g.id ?? g);

		try {
			var resp = await this.handle(
				ROUTES[this.#_version].REMOVE_MEMBER_GROUPS(data.member),
				{token, body: groups}
			)
		} catch(e) {
			throw e;
		}

		return;
	}

	async setMemberGroups(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error('POST requires a token.');
		if(!data.member) throw new Error('Must provide a member ID.');
		if(!data.groups || !Array.isArray(data.groups))
			throw new Error('Must provide an array of groups.');
		var groups = data.groups;
		if(groups.find(g => g instanceof Group)) groups = groups.map(g => g.id ?? g);

		try {
			var resp = await this.handle(
				ROUTES[this.#_version].SET_MEMBER_GROUPS(data.member),
				{token, body: groups}
			)
		} catch(e) {
			throw e;
		}

		return;
	}

	async getMemberGuildSettings(data = {}) {
		if(this.version < 2) throw new Error("Guild settings are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error("Getting guild settings requires a token.");
		if(!data.member) throw new Error("Must provide a member ID.");
		if(!data.guild) throw new Error("Must provide a guild ID.");

		try {
			var resp = await this.handle(
				ROUTES[this.#_version].GET_MEMBER_GUILD_SETTINGS(data.member, data.guild),
				{token}
			);
		} catch(e) {
			throw e;
		}

		return new MemberGuildSettings(this, {...resp.data, guild: data.guild});
	}

	async patchMemberGuildSettings(data = {}) {
		if(this.version < 2) throw new Error("Guild settings are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error("Getting guild settings requires a token.");
		if(!data.member) throw new Error("Must provide a member ID.");
		if(!data.guild) throw new Error("Must provide a guild ID.");

		try {
			var settings = data instanceof MemberGuildSettings ? data : new MemberGuildSettings(this, data);
			var body = await settings.verify();
			settings = await this.handle(
				ROUTES[this.#_version].PATCH_MEMBER_GUILD_SETTINGS(data.member, data.guild),
				{token, body}
			);
		} catch(e) {
			throw e;
		}

		return new MemberGuildSettings(this, {...settings.data, guild: data.guild});
	}

	/*
	**			GROUP FUNCTIONS
	*/

	async createGroup(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error('POST requires a token.');

		try {
			var group = new Group(this, data);
			var body = await group.verify();
			group = await this.handle(ROUTES[this.#_version].ADD_GROUP(), {token, body});
		} catch(e) {
			throw e;
		}

		return new Group(this, group.data);
	}

	async getGroups(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		var system = data.system ?? '@me';

		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_GROUPS(system), {token});
		} catch(e) {
			throw e;
		}

		var groups = resp.data.map(g => [g.id, new Group(this, g)]);
		return new Map(groups);
	}

	async getGroup(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		if(!data.group) throw new Error('Must provide group ID.');

		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_GROUP(data.group), {token});
			var group = new Group(this, resp.data);

			if(data.fetch_members) group.members = await group.getMembers();
		} catch(e) {
			throw e;
		}

		return group;
	}

	async patchGroup(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		if(data.group == null) throw new Error("Must provide a group ID.");
		var token = this.#token || data.token;
		if(!token) throw new Error("PATCH requires a token.");

		try {
			var group = data instanceof Group ? data : new Group(this, data);
			var body = await group.verify();
			group = await this.handle(ROUTES[this.#_version].PATCH_GROUP(data.group), {token, body});
		} catch(e) {
			throw e;
		}

		return new Group(this, group.data);
	}

	async deleteGroup(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");
		
		if(data.group == null) throw new Error("Must provide a group ID.");
		var token = this.#token || data.token;
		if(!token) throw new Error("DELETE requires a token.");

		try {
			await this.handle(ROUTES[this.#_version].DELETE_GROUP(data.group), {token});
		} catch(e) {
			throw e;
		}

		return;
	}

	async getGroupMembers(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		if(!data.group) throw new Error("Must provide a group ID.");

		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_GROUP_MEMBERS(data.group));
		} catch(e) {
			throw e;
		}

		var mems = resp.data.map(m => [m.id, new Member(this, m)]);
		return new Map(mems);
	}

	async addGroupMembers(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error('POST requires a token.');
		if(!data.group) throw new Error('Must provide a group ID.');
		if(!data.members || !Array.isArray(data.members))
			throw new Error('Must provide an array of members.');
		var members = data.members;
		if(members.find(g => g instanceof Member)) members = members.map(m => m.id ?? m);

		try {
			var resp = await this.handle(
				ROUTES[this.#_version].ADD_GROUP_MEMBERS(data.group),
				{token, body: members}
			)
		} catch(e) {
			throw e;
		}

		return;
	}

	async removeGroupMembers(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error('POST requires a token.');
		if(!data.group) throw new Error('Must provide a group ID.');
		if(!data.members || !Array.isArray(data.members))
			throw new Error('Must provide an array of members.');
		var members = data.members;
		if(members.find(g => g instanceof Member)) members = members.map(m => m.id ?? m);

		try {
			var resp = await this.handle(
				ROUTES[this.#_version].REMOVE_GROUP_MEMBERS(data.group),
				{token, body: members}
			)
		} catch(e) {
			throw e;
		}

		return;
	}

	async setGroupMembers(data = {}) {
		if(this.version < 2) throw new Error("Groups are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error('POST requires a token.');
		if(!data.group) throw new Error('Must provide a group ID.');
		if(!data.members || !Array.isArray(data.members))
			throw new Error('Must provide an array of members.');
		var members = data.members;
		if(members.find(g => g instanceof Member)) members = members.map(m => m.id ?? m);

		try {
			var resp = await this.handle(
				ROUTES[this.#_version].SET_GROUP_MEMBERS(data.group),
				{token, body: members}
			)
		} catch(e) {
			throw e;
		}

		return;
	}

	/*
	**			SWITCH FUNCTIONS
	*/

	async createSwitch(data = {}) {
		var token = this.#token || data.token;
		if(!token) throw new Error("POST requires a token.");

		var body = {members: []};
		if(data.members) {
			for(var m of data.members)
				body.members.push(m.id ?? m);
		}
		try {
			var resp = await this.handle(ROUTES[this.#_version].ADD_SWITCH(), {token, body})
		} catch(e) {
			throw e
		}

		if(this.#_version < 2) return;

		return new Switch(this, {
			...resp.data,
			members: new Map(resp.data.members.map(m => [m.id, new Member(this, m)]))
		});
	}

	async getSwitches(data = {}) {
		var system = data.system ?? '@me';
		var token = this.#token || data.token;
		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_SWITCHES(system), {token});
			if(!data.raw) var membs = await this.handle(ROUTES[this.#_version].GET_MEMBERS(system), {token})
		} catch(e) {
			throw e;
		}

		if(!data.raw) {
			membs = new Map(membs.data.map(m => [m.id, new Member(this, m)]));
			var switches = [];
			for(var s of resp.data) {
				var members = new Map();
				for(var m of s.members) if(membs.get(m)) members.set(m, membs.get(m));
				s.members = members;
				switches.push(new Switch(this, s));
			}
		} else switches = resp.data.map(s => new Switch(this, s));

		if(this.#_version < 2) return switches;
		else return new Map(switches.map(s => [s.id, s]));
	}

	async getSwitch(data = {}) {
		if(this.version < 2) throw new Error("Individual switches are only available for API version 2.");

		var token = this.#token || data.token;
		var system = data.system ?? '@me';
		if(!data.switch) throw new Error("Must provide a switch ID.");

		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_SWITCH(system, data.switch))
		} catch(e) {
			throw e;
		}

		return new Switch(this, {
			...resp.data,
			members: new Map(resp.data.members.map(m => [m.id, new Member(this, m)]))
		});
	}

	async getFronters(data = {}) {
		var token = this.#token || data.token;
		var system = data.system ?? '@me';
		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_FRONTERS(system), {token});
		} catch(e) {
			throw e;
		}

		return new Switch(this, {
			...resp.data,
			members: new Map(resp.data.members.map(m => [m.id, new Member(this, m)]))
		});
	}

	async patchSwitchTimestamp(data = {}) {
		if(this.version < 2) throw new Error("Individual switches are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error('PATCH requires a token.');
		if(!data.switch) throw new Error('Must provide a switch ID.');
		if(!data.timestamp) throw new Error('Must provide a timestamp.');

		try {
			var sw = await this.handle(ROUTES[this.#_version].PATCH_SWITCH(data.switch), {
				token,
				body: {timestamp: data.timestamp}
			});
		} catch(e) {
			throw e;
		}

		return new Switch(this, {
			...sw.data,
			members: new Map(sw.data.members.map(m => [m.id, new Member(this, m)]))
		});
	}

	async patchSwitchMembers(data = {}) {
		if(this.version < 2) throw new Error("Individual switches are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error('PATCH requires a token.');
		if(!data.switch) throw new Error('Must provide a switch ID.');

		try {
			var s = data instanceof Switch ? data : new Switch(this, data);
			s = await s.verify();
			if(s.members && !Array.isArray(s.members))
				throw new Error('Members must be an array or map if provided.');

			var sw = await this.handle(ROUTES[this.#_version].PATCH_SWITCH_MEMBERS(data.switch), {
				token,
				body: s.members ?? []
			});
		} catch(e) {
			throw e;
		}

		return new Switch(this, {
			...sw.data,
			members: new Map(sw.data.members.map(m => [m.id, new Member(this, m)]))
		});
	}

	async deleteSwitch(data = {}) {
		if(this.version < 2) throw new Error("Individual switches are only available for API version 2.");

		var token = this.#token || data.token;
		if(!token) throw new Error('DELETE requires a token.');
		if(!data.switch) throw new Error('Must provide a switch ID.');

		try {
			await this.handle(ROUTES[this.#_version].DELETE_SWITCH(data.switch));
		} catch(e) {
			throw e;
		}

		return;
	}

	/*
	** 			MISC FUNCTIONS
	*/

	async getMessage(data = {}) {
		if(data.message == null) throw new Error('Must provide a message ID.');
		var token = this.#token || data.token;
		try {
			var resp = await this.handle(ROUTES[this.#_version].GET_MESSAGE(data.message), {token});
		} catch(e) {
			throw e;
		}

		return new Message(this, resp.data);
	}

	/*
	**			BASE STUFF
	*/

	async handle(path, options = {}) {
		var { route, method } = path;
		var headers = options.headers || {};
		var request = {method, headers};
		var token = this.#token || options.token;
		if(token) request.headers["Authorization"] = token;

		if(options.body) {
			request.headers["content-type"] = "application/json";
	        request.data = JSON.stringify(options.body);
		}

		if(this.version == 1 && !this.#version_warning) {
			console.warn(
				'WARNING: API version 1 is considered officially deprecated. ' +
				'Support for this API version may be removed from this wrapper ' +
				'in a future version. Some methods may not fully work for v1 as well. '+
				'USE v1 at your own risk!'
			);
			this.#version_warning = true;
		}
			
		try {
			var resp = await this.#inst(route, request);
		} catch(e) {
			console.log(e)
			throw new APIError(this, e.response);
		}

		return resp;
	}
	
	set base_url(s) {
		this.#_base = s;
		this.#inst.defaults.baseURL = `${this._base}/v${this._version}`;
	}

	get base_url() {
		return this.#_base;
	}

	set version(n) {
		this.#_version = n;
		this.#inst.defaults.baseURL = `${this._base}/v${this._version}`;
	}

	get version() {
		return this.#_version;
	}

	set token(t) {
		this.#token = t;
	}

	get token() {
		return this.#token;
	}
}

module.exports = PKAPI;
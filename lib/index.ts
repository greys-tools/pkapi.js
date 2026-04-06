import axios from 'axios';

import System, { ISystem } from './structures/system';
import Member, { IMember, ProxyTag } from './structures/member';
import Group, { IGroup } from './structures/group';
import Switch, { ISwitch } from './structures/switch';
import Message, { IMessage } from './structures/message';
import SystemConfig, { ISystemConfig } from './structures/systemConfig';
import SystemGuildSettings, {
	ISystemGuildSettings,
} from './structures/systemGuildSettings';
import SystemAutoproxySettings, {
	ISystemAutoproxySettings,
} from './structures/systemAutoproxySettings';
import MemberGuildSettings, {
	IMemberGuildSettings,
} from './structures/memberGuildSettings';

import APIError from './structures/apiError';

import ROUTES from './routes';

import DefaultRateLimiter from './RateLimiter/DefaultRateLimiter';
import BaseRateLimiter from './RateLimiter/BaseRateLimiter';
import NoOpRateLimiter from './RateLimiter/NoOpRateLimiter';

export interface APIData {
	base_url?: string;
	version?: number;
	token?: string;
	user_agent?: string;
	debug?: boolean;
	rate_limiter?: BaseRateLimiter;
}

export interface RequestOptions {
	token?: string;
}

export interface GetSystemOptions extends RequestOptions {
	system?: string;
	fetch?: Array<SystemFetchOptions>;
	raw?: boolean;
}

export const enum SystemFetchOptions {
	Members = 'members',
	Fronters = 'fronters',
	Switches = 'switches',
	Groups = 'groups',
	Config = 'config',
	GroupMembers = 'group members',
}

export type RequestData<T extends {}> = T & {
	token?: string;
};

class PKAPI {
	#token?: string;
	#inst;
	#_base: string = 'https://api.pluralkit.me';
	#_version: number = 2;
	#user_agent: string = 'PKAPI.js/5.x';
	#debug: boolean = true;
	#rate_limiter: BaseRateLimiter;

	#version_warning = false;

	constructor(data?: APIData) {
		this.#_base = data?.base_url ?? 'https://api.pluralkit.me';
		this.#_version = data?.version ?? 2;
		this.#token = data?.token;
		this.#user_agent = data?.user_agent ?? 'PKAPI.js/5.x';
		this.#debug = data?.debug !== undefined ? data.debug : true;
		this.#rate_limiter = data?.rate_limiter ?? new NoOpRateLimiter();

		this.#inst = axios.create({
			validateStatus: (s: number) => s < 300 && s > 100,
			baseURL: `${this.#_base}/v${this.#_version}`,
			headers: {
				'User-Agent': this.#user_agent,
			},
		});
	}

	/*
	 **			SYSTEM FUNCTIONS
	 */

	async getSystem(data: GetSystemOptions = {}) {
		var token = this.#token ?? data.token;
		if (data.system == null && !token)
			throw new Error('Must provide a token or ID.');
		var sys;
		var resp;

		if (token) {
			resp = await this.handle(ROUTES[this.#_version].GET_OWN_SYSTEM(), {
				token,
			});
			sys = new System(this, resp.data);
		} else {
			if (data.system!.length > 5)
				resp = await this.handle(
					ROUTES[this.#_version].GET_ACCOUNT(data.system),
				);
			else
				resp = await this.handle(
					ROUTES[this.#_version].GET_SYSTEM(data.system!),
				);
			sys = new System(this, resp.data);
		}

		if (data.fetch) {
			if (data.fetch.includes(SystemFetchOptions.Members))
				sys.members = await sys.getMembers(token);
			if (data.fetch.includes(SystemFetchOptions.Fronters))
				sys.fronters = await sys.getFronters(token);
			if (data.fetch.includes(SystemFetchOptions.Switches))
				sys.switches = await sys.getSwitches(token, data.raw);
			if (data.fetch.includes(SystemFetchOptions.Groups))
				sys.groups = await sys.getGroups(
					token,
					data.fetch.includes(SystemFetchOptions.GroupMembers),
				);
			if (data.fetch.includes(SystemFetchOptions.Config))
				sys.config = await sys.getConfig(token);
		}

		return sys;
	}

	async getAccount(data: GetSystemOptions = {}) {
		return await this.getSystem(data);
	}

	async patchSystem(data: System | Partial<System> = {}) {
		var token = this.#token ?? data.token;
		if (!token) throw new Error('PATCH requires a token.');

		var sys = data instanceof System ? data : new System(this, data);
		var body = await sys.verify();
		var resp = await this.handle(ROUTES[this.#_version].PATCH_SYSTEM(), {
			token,
			body,
		});

		return new System(this, resp.data);
	}

	async getSystemConfig(data: RequestOptions = {}) {
		if (this.version < 2)
			throw new Error('System settings are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('Getting system settings requires a token.');

		var resp = await this.handle(ROUTES[this.#_version].GET_SYSTEM_CONFIG(), {
			token,
		});

		return new SystemConfig(this, resp.data);
	}

	async patchSystemConfig(data: RequestData<ISystemConfig>) {
		if (this.version < 2)
			throw new Error('System settings are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('PATCH requires a token.');

		var settings =
			data instanceof SystemConfig ? data : new SystemConfig(this, data);
		var body = await settings.verify();
		var resp = await this.handle(ROUTES[this.#_version].PATCH_SYSTEM_CONFIG(), {
			token,
			body,
		});

		return new SystemConfig(this, resp.data);
	}

	async getSystemGuildSettings(data: { token?: string; guild: string }) {
		if (this.version < 2)
			throw new Error('Guild settings are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('Getting guild settings requires a token.');
		if (!data.guild) throw new Error('Must provide a guild ID.');

		var resp = await this.handle(
			ROUTES[this.#_version].GET_SYSTEM_GUILD_SETTINGS(data.guild),
			{ token },
		);

		return new SystemGuildSettings(this, { ...resp.data, guild: data.guild });
	}

	async patchSystemGuildSettings(data: RequestData<ISystemGuildSettings>) {
		if (this.version < 2)
			throw new Error('Guild settings are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('PATCH requires a token.');
		if (!data.guild) throw new Error('Must provide a guild ID.');

		var settings =
			data instanceof SystemGuildSettings
				? data
				: new SystemGuildSettings(this, data);
		var body = await settings.verify();
		var resp = await this.handle(
			ROUTES[this.#_version].PATCH_SYSTEM_GUILD_SETTINGS(data.guild),
			{ token, body },
		);

		return new SystemGuildSettings(this, { ...resp.data, guild: data.guild });
	}

	async getSystemAutoproxySettings(data: { token?: string; guild: string }) {
		if (this.version < 2)
			throw new Error(
				'Autoproxy settings are only available for API version 2.',
			);

		var token = this.#token || data.token;
		if (!token) throw new Error('Getting autoproxy settings requires a token.');
		if (!data.guild) throw new Error('Must provide a guild ID.');

		var resp = await this.handle(
			ROUTES[this.#_version].GET_SYSTEM_AUTOPROXY_SETTINGS(data.guild),
			{ token },
		);

		return new SystemAutoproxySettings(this, {
			...resp.data,
			guild: data.guild,
		});
	}

	async patchSystemAutoproxySettings(
		data: RequestData<ISystemAutoproxySettings>,
	) {
		if (this.version < 2)
			throw new Error(
				'Autoproxy settings are only available for API version 2.',
			);

		var token = this.#token || data.token;
		if (!token) throw new Error('PATCH requires a token.');
		if (!data.guild) throw new Error('Must provide a guild ID.');

		var settings =
			data instanceof SystemAutoproxySettings
				? data
				: new SystemAutoproxySettings(this, data);
		var body = await settings.verify();
		var resp = await this.handle(
			ROUTES[this.#_version].PATCH_SYSTEM_AUTOPROXY_SETTINGS(data.guild),
			{ token, body },
		);

		return new SystemAutoproxySettings(this, {
			...resp.data,
			guild: data.guild,
		});
	}

	/*
	 **			MEMBER FUNCTIONS
	 */

	async createMember(data: RequestData<Partial<IMember>>) {
		var token = this.#token || data.token;
		if (!token) throw new Error('POST requires a token.');

		var mem = new Member(this, data);
		var body = await mem.verify();
		var resp = await this.handle(ROUTES[this.#_version].ADD_MEMBER(), {
			token,
			body,
		});

		return new Member(this, resp.data);
	}

	async getMember(data: { token?: string; member: string }) {
		if (data.member == null) throw new Error('Must provide a member ID.');
		var token = this.#token || data.token;
		try {
			var resp = await this.handle(
				ROUTES[this.#_version].GET_MEMBER(data.member),
				{ token },
			);
		} catch (e) {
			throw e;
		}

		return new Member(this, resp.data);
	}

	async getMembers(data: { token?: string; system: string }) {
		var token = this.#token || data.token;
		var system = data.system ?? '@me';

		var resp = await this.handle(ROUTES[this.#_version].GET_MEMBERS(system), {
			token,
		});

		var mems = resp.data.map((m: IMember) => [m.id, new Member(this, m)]);
		return new Map<string, Member>(mems);
	}

	async patchMember(data: RequestData<Partial<IMember> & { member: string }>) {
		if (data.member == null) throw new Error('Must provide a member ID.');
		var token = this.#token || data.token;
		if (!token) throw new Error('PATCH requires a token.');

		var mem = data instanceof Member ? data : new Member(this, data);
		var body = await mem.verify();
		var resp = await this.handle(
			ROUTES[this.#_version].PATCH_MEMBER(data.member),
			{ token, body },
		);

		return new Member(this, resp.data);
	}

	async deleteMember(data: { token?: string; member: string }) {
		if (data.member == null) throw new Error('Must provide a member ID.');
		var token = this.#token || data.token;
		if (!token) throw new Error('DELETE requires a token.');

		var resp = await this.handle(
			ROUTES[this.#_version].DELETE_MEMBER(data.member),
			{ token },
		);

		return null;
	}

	async getMemberGroups(data: { token?: string; member: string }) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		if (!data.member) throw new Error('Must provide a member ID.');

		var resp = await this.handle(
			ROUTES[this.#_version].GET_MEMBER_GROUPS(data.member),
			{ token },
		);

		var groups = resp.data.map((g: IGroup) => [g.id, new Group(this, g)]);
		return new Map<string, Group>(groups);
	}

	async addMemberGroups(data: {
		token?: string;
		member: string;
		groups: string[] | Group[];
	}) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('POST requires a token.');
		if (!data.member) throw new Error('Must provide a member ID.');
		if (!data.groups || !Array.isArray(data.groups))
			throw new Error('Must provide an array of groups.');
		var groups = data.groups;
		groups = groups.map((g) => (g instanceof Group ? g.id : g));

		var resp = await this.handle(
			ROUTES[this.#_version].ADD_MEMBER_GROUPS(data.member),
			{ token, body: groups },
		);

		return;
	}

	async removeMemberGroups(data: {
		token?: string;
		member: string;
		groups: string[] | Group[];
	}) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('POST requires a token.');
		if (!data.member) throw new Error('Must provide a member ID.');
		if (!data.groups || !Array.isArray(data.groups))
			throw new Error('Must provide an array of groups.');
		var groups = data.groups;
		groups = groups.map((g) => (g instanceof Group ? g.id : g));

		var resp = await this.handle(
			ROUTES[this.#_version].REMOVE_MEMBER_GROUPS(data.member),
			{ token, body: groups },
		);

		return;
	}

	async setMemberGroups(data: {
		token?: string;
		member: string;
		groups: string[] | Group[];
	}) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('POST requires a token.');
		if (!data.member) throw new Error('Must provide a member ID.');
		if (!data.groups || !Array.isArray(data.groups))
			throw new Error('Must provide an array of groups.');
		var groups = data.groups;
		groups = groups.map((g) => (g instanceof Group ? g.id : g));

		var resp = await this.handle(
			ROUTES[this.#_version].SET_MEMBER_GROUPS(data.member),
			{ token, body: groups },
		);

		return;
	}

	async getMemberGuildSettings(data: {
		token?: string;
		member: string;
		guild: string;
	}) {
		if (this.version < 2)
			throw new Error('Guild settings are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('Getting guild settings requires a token.');
		if (!data.member) throw new Error('Must provide a member ID.');
		if (!data.guild) throw new Error('Must provide a guild ID.');

		var resp = await this.handle(
			ROUTES[this.#_version].GET_MEMBER_GUILD_SETTINGS(data.member, data.guild),
			{ token },
		);

		return new MemberGuildSettings(this, {
			...resp.data,
			guild: data.guild,
			member: data.member,
		});
	}

	async patchMemberGuildSettings(
		data: RequestData<Partial<IMemberGuildSettings>>,
	) {
		if (this.version < 2)
			throw new Error('Guild settings are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('Getting guild settings requires a token.');
		if (!data.member) throw new Error('Must provide a member ID.');
		if (!data.guild) throw new Error('Must provide a guild ID.');

		var settings =
			data instanceof MemberGuildSettings
				? data
				: new MemberGuildSettings(this, data);
		var body = await settings.verify();
		var resp = await this.handle(
			ROUTES[this.#_version].PATCH_MEMBER_GUILD_SETTINGS(
				data.member,
				data.guild,
			),
			{ token, body },
		);

		return new MemberGuildSettings(this, {
			...resp.data,
			guild: data.guild,
			member: data.member,
		});
	}

	/*
	 **			GROUP FUNCTIONS
	 */

	async createGroup(data: RequestData<Partial<IGroup>>) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('POST requires a token.');

		var group = new Group(this, data);
		var body = await group.verify();
		var resp = await this.handle(ROUTES[this.#_version].ADD_GROUP(), {
			token,
			body,
		});

		return new Group(this, resp.data);
	}

	async getGroups(data: {
		token?: string;
		system?: string;
		with_members?: boolean;
		raw?: boolean;
	}) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		var system = data.system ?? '@me';
		var with_members = data.with_members ?? false;

		var groups;
		var resp = await this.handle(
			ROUTES[this.#_version].GET_GROUPS(system, with_members),
			{ token },
		);
		if (with_members && !data.raw) {
			var memb_resp = await this.handle(
				ROUTES[this.#_version].GET_MEMBERS(system),
				{ token },
			);
			var membs: Map<string, Member> = new Map(
				memb_resp.data.map((m: IMember) => [m.uuid, new Member(this, m)]),
			);
			groups = [];
			for (var g of resp.data) {
				var members = new Map();
				for (var m of g.members) {
					var grabbed: Member | undefined = membs.get(m);
					if (grabbed) members.set(grabbed.id, grabbed);
				}
				g.members = members;
				groups.push(new Group(this, g));
			}
		}

		if (!with_members || data.raw)
			groups = resp.data.map((g: IGroup) => new Group(this, g));

		return new Map<string, Group>(groups.map((g: IGroup) => [g.id, g]));
	}

	async getGroup(data: {
		token?: string;
		group: string;
		fetch_members?: boolean;
	}) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		if (!data.group) throw new Error('Must provide group ID.');

		var resp = await this.handle(ROUTES[this.#_version].GET_GROUP(data.group), {
			token,
		});
		var group = new Group(this, resp.data);

		if (data.fetch_members) group.members = await group.getMembers();

		return group;
	}

	async patchGroup(data: RequestData<Partial<IGroup> & { group: string }>) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		if (data.group == null) throw new Error('Must provide a group ID.');
		var token = this.#token || data.token;
		if (!token) throw new Error('PATCH requires a token.');

		var group = data instanceof Group ? data : new Group(this, data);
		var body = await group.verify();
		var resp = await this.handle(
			ROUTES[this.#_version].PATCH_GROUP(data.group),
			{ token, body },
		);

		return new Group(this, resp.data);
	}

	async deleteGroup(data: { token?: string; group: string }) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		if (data.group == null) throw new Error('Must provide a group ID.');
		var token = this.#token || data.token;
		if (!token) throw new Error('DELETE requires a token.');

		await this.handle(ROUTES[this.#_version].DELETE_GROUP(data.group), {
			token,
		});

		return;
	}

	async getGroupMembers(data: { token?: string; group: string }) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		if (!data.group) throw new Error('Must provide a group ID.');

		var resp = await this.handle(
			ROUTES[this.#_version].GET_GROUP_MEMBERS(data.group),
			{ token },
		);

		var mems = resp.data.map((m: IMember) => [m.id, new Member(this, m)]);
		return new Map<string, Member>(mems);
	}

	async addGroupMembers(data: {
		token?: string;
		group: string;
		members: string[] | Member[];
	}) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('POST requires a token.');
		if (!data.group) throw new Error('Must provide a group ID.');
		if (!data.members || !Array.isArray(data.members))
			throw new Error('Must provide an array of members.');
		var members = data.members;
		members = members.map((m) => (m instanceof Member ? m.id : m));

		var resp = await this.handle(
			ROUTES[this.#_version].ADD_GROUP_MEMBERS(data.group),
			{ token, body: members },
		);

		return;
	}

	async removeGroupMembers(data: {
		token?: string;
		group: string;
		members: string[] | Member[];
	}) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('POST requires a token.');
		if (!data.group) throw new Error('Must provide a group ID.');
		if (!data.members || !Array.isArray(data.members))
			throw new Error('Must provide an array of members.');
		var members = data.members;
		members = members.map((m) => (m instanceof Member ? m.id : m));

		var resp = await this.handle(
			ROUTES[this.#_version].REMOVE_GROUP_MEMBERS(data.group),
			{ token, body: members },
		);

		return;
	}

	async setGroupMembers(data: {
		token?: string;
		group: string;
		members: string[] | Member[];
	}) {
		if (this.version < 2)
			throw new Error('Groups are only available for API version 2.');

		var token = this.#token || data.token;
		if (!token) throw new Error('POST requires a token.');
		if (!data.group) throw new Error('Must provide a group ID.');
		if (!data.members || !Array.isArray(data.members))
			throw new Error('Must provide an array of members.');
		var members = data.members;
		members = members.map((m) => (m instanceof Member ? m.id : m));

		var resp = await this.handle(
			ROUTES[this.#_version].SET_GROUP_MEMBERS(data.group),
			{ token, body: members },
		);

		return;
	}

	/*
	 **			SWITCH FUNCTIONS
	 */

	async createSwitch(data: RequestData<Partial<ISwitch>>) {
		var token = this.#token || data.token;
		if (!token) throw new Error('POST requires a token.');

		var body: {
			members: string[];
		} = {
			members: [],
		};

		if (data.members) {
			if (Array.isArray(data.members)) {
				body.members = data.members;
			} else {
				body.members = Object.values(data.members).map((m: IMember) => m.id);
			}
		}
		var resp = await this.handle(ROUTES[this.#_version].ADD_SWITCH(), {
			token,
			body,
		});

		if (this.#_version < 2) return;

		return new Switch(this, {
			...resp.data,
			members: new Map(
				resp.data.members.map((m: IMember) => [m.id, new Member(this, m)]),
			),
		});
	}

	async getSwitches(data: {
		token?: string;
		system?: string;
		raw?: boolean;
		before?: Date;
		limit?: number;
	}) {
		var system = data.system ?? '@me';
		var token = this.#token || data.token;
		var { before, limit } = data;
		var resp = await this.handle(
			ROUTES[this.#_version].GET_SWITCHES(system, before, limit),
			{ token },
		);
		if (!data.raw) {
			var memb_resp = await this.handle(
				ROUTES[this.#_version].GET_MEMBERS(system),
				{ token },
			);
			var membs = new Map(
				memb_resp.data.map((m: IMember) => [m.id, new Member(this, m)]),
			);
			var switches = [];
			for (var s of resp.data) {
				var members = new Map();
				for (var m of s.members) if (membs.get(m)) members.set(m, membs.get(m));
				s.members = members;
				switches.push(new Switch(this, s));
			}
		}

		if (data.raw) {
			switches = resp.data.map((s: ISwitch) => new Switch(this, s));
		}

		if (this.#_version < 2) return switches;
		else return new Map(switches.map((s: ISwitch) => [s.id, s]));
	}

	async getSwitch(data: { token?: string; system?: string; switch: string }) {
		if (this.version < 2)
			throw new Error(
				'Individual switches are only available for API version 2.',
			);

		var token = this.#token || data.token;
		var system = data.system ?? '@me';
		if (!data.switch) throw new Error('Must provide a switch ID.');

		var resp = await this.handle(
			ROUTES[this.#_version].GET_SWITCH(system, data.switch),
			{ token },
		);

		return new Switch(this, {
			...resp.data,
			members: new Map(
				resp.data.members.map((m: IMember) => [m.id, new Member(this, m)]),
			),
		});
	}

	async getFronters(data: { token?: string; system?: string }) {
		var token = this.#token || data.token;
		var system = data.system ?? '@me';
		try {
			var resp = await this.handle(
				ROUTES[this.#_version].GET_FRONTERS(system),
				{ token },
			);
		} catch (e) {
			throw e;
		}

		if (resp.status == 204) return undefined;

		return new Switch(this, {
			...resp.data,
			members: new Map(
				resp.data.members.map((m: IMember) => [m.id, new Member(this, m)]),
			),
		});
	}

	async patchSwitchTimestamp(data: {
		token?: string;
		switch: string;
		timestamp: string | Date;
	}) {
		if (this.version < 2)
			throw new Error(
				'Individual switches are only available for API version 2.',
			);

		var token = this.#token || data.token;
		if (!token) throw new Error('PATCH requires a token.');
		if (!data.switch) throw new Error('Must provide a switch ID.');
		if (!data.timestamp) throw new Error('Must provide a timestamp.');

		var sw = await this.handle(
			ROUTES[this.#_version].PATCH_SWITCH(data.switch),
			{
				token,
				body: { timestamp: data.timestamp },
			},
		);

		return new Switch(this, {
			...sw.data,
			members: new Map(
				sw.data.members.map((m: IMember) => [m.id, new Member(this, m)]),
			),
		});
	}

	async patchSwitchMembers(data: {
		token?: string;
		switch: string;
		members?: string[];
	}) {
		if (this.version < 2)
			throw new Error(
				'Individual switches are only available for API version 2.',
			);

		var token = this.#token || data.token;
		if (!token) throw new Error('PATCH requires a token.');
		if (!data.switch) throw new Error('Must provide a switch ID.');

		var s = data instanceof Switch ? data : new Switch(this, data);
		var sv = await s.verify();
		if (sv.members && !Array.isArray(sv.members))
			throw new Error('Members must be an array or map if provided.');

		var sw = await this.handle(
			ROUTES[this.#_version].PATCH_SWITCH_MEMBERS(data.switch),
			{
				token,
				body: sv.members ?? [],
			},
		);

		return new Switch(this, {
			...sw.data,
			members: new Map(
				sw.data.members.map((m: IMember) => [m.id, new Member(this, m)]),
			),
		});
	}

	async deleteSwitch(data: { token?: string; switch: string }) {
		if (this.version < 2)
			throw new Error(
				'Individual switches are only available for API version 2.',
			);

		var token = this.#token || data.token;
		if (!token) throw new Error('DELETE requires a token.');
		if (!data.switch) throw new Error('Must provide a switch ID.');

		await this.handle(ROUTES[this.#_version].DELETE_SWITCH(data.switch), {
			token,
		});

		return;
	}

	/*
	 ** 			MISC FUNCTIONS
	 */

	async getMessage(data: { token?: string; message: string }) {
		if (data.message == null) throw new Error('Must provide a message ID.');
		var token = this.#token || data.token;
		var resp = await this.handle(
			ROUTES[this.#_version].GET_MESSAGE(data.message),
			{ token },
		);

		return new Message(this, resp.data);
	}

	/*
	 **			BASE STUFF
	 */

	async handle(
		path: any,
		options?: {
			token?: string;
			headers?: any;
			body?: any;
		},
	) {
		var { route, method } = path;
		var headers = options?.headers || {};
		var request: {
			method?: any;
			headers?: any;
			data?: any;
		} = { method, headers };
		var token = this.#token || options?.token;
		if (token) request.headers['Authorization'] = token;

		if (options?.body) {
			request.headers['content-type'] = 'application/json';
			request.data = JSON.stringify(options.body);
		}

		if (this.version == 1 && !this.#version_warning) {
			console.warn(
				'WARNING: API version 1 is considered officially deprecated. ' +
					'Support for this API version may be removed from this wrapper ' +
					'in a future version. Some methods may not fully work for v1 as well. ' +
					'USE v1 at your own risk!',
			);
			this.#version_warning = true;
		}

		while (true) {
			await this.#rate_limiter.wait();
			try {
				var resp = await this.#inst(route, request);
				await this.#rate_limiter.handleResponse(resp);
			} catch (e: any) {
				if (await this.#rate_limiter.handleError(e)) {
					continue;
				}

				if (this.#debug) console.log(e);
				throw new APIError(this, e.response);
			}

			return resp;
		}
	}

	set base_url(s) {
		this.#_base = s;
		this.#inst.defaults.baseURL = `${this.#_base}/v${this.#_version}`;
	}

	get base_url() {
		return this.#_base;
	}

	set version(n) {
		this.#_version = n;
		this.#inst.defaults.baseURL = `${this.#_base}/v${this.#_version}`;
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

	get user_agent() {
		return this.#user_agent;
	}

	set user_agent(s) {
		this.#user_agent = s;
		this.#inst.defaults.headers['User-Agent'] = s;
	}

	get debug() {
		return this.#debug;
	}

	set debug(b) {
		this.#debug = b;
	}

	get rate_limiter() {
		return this.#rate_limiter;
	}
	set rate_limiter(r) {
		this.#rate_limiter = r;
	}
}

export default PKAPI;
export {
	PKAPI,
	APIError,
	Group,
	IGroup,
	Member,
	IMember,
	ProxyTag,
	MemberGuildSettings,
	IMemberGuildSettings,
	Message,
	IMessage,
	Switch,
	ISwitch,
	System,
	ISystem,
	SystemAutoproxySettings,
	ISystemAutoproxySettings,
	SystemConfig,
	ISystemConfig,
	SystemGuildSettings,
	ISystemGuildSettings,
	BaseRateLimiter,
	NoOpRateLimiter,
	DefaultRateLimiter,
};

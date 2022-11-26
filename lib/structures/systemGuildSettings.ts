import API from '../index';

export enum AutoProxyModes {
	Off = 'off',
	Front = 'front',
	Latch = 'latch',
	Member = 'member'
}

const apVals: string[] = [
	AutoProxyModes.Off,
	AutoProxyModes.Front,
	AutoProxyModes.Latch,
	AutoProxyModes.Member
]

const KEYS: any = {
	guild: { },
	proxying_enabled: {
		transform: (v?: any) => v ? true : false
	},
	autoproxy_mode: {
		test: (s?: string) => s && apVals.includes(s),
		err: `Valid autoproxy mode values: ${apVals.join(", ")}`
	},
	autoproxy_member: { },
	tag: {
		test: (s?: string) => s!.length <= 79,
		err: 'Server tag must be 79 characters or less'
	},
	tag_enabled: {
		transform: (v?: any) => v ? true : false
	}
}

export interface ISystemGuildSettings {
	[key: string]: any;

	guild: string;
	proxying_enabled?: boolean;
	autoproxy_mode?: AutoProxyModes;
	tag?: string;
	tag_enabled?: boolean;
}

export default class SystemGuildSettings implements ISystemGuildSettings {
	[key: string]: any;

	#api: API;
	
	guild = '';
	proxying_enabled?: boolean;
	autoproxy_mode?: AutoProxyModes;
	tag?: string;
	tag_enabled?: boolean;

	constructor(api: API, data: Partial<SystemGuildSettings> = { }) {
		this.#api = api;
		for(var k in data) {
			if(KEYS[k]) {
				if(KEYS[k].init) data[k] = KEYS[k].init(data[k]);
				this[k] = data[k];
			}
		}
	}

	async patch(token?: string) {
		var data = await this.#api.patchSystemGuildSettings({...this, token});
		for(var k in data) if(KEYS[k]) this[k] = data[k];
		return this;
	}

	async verify() {
		var settings: Partial<SystemGuildSettings> = {};
		var errors = [];
		for(var k in KEYS) {
			var test = true;
			if(this[k] == null) {
				settings[k] = this[k];
				continue;
			}
			if(this[k] == undefined) continue;
			
			if(KEYS[k].test) test = await KEYS[k].test(this[k]);
			if(!test) {
				errors.push(KEYS[k].err);
				continue;
			}
			if(KEYS[k].transform) this[k] = KEYS[k].transform(this[k]);
			settings[k] = this[k];
		}

		if(settings.autoproxy_mode == 'member' && !settings.autoproxy_member)
			errors.push('Autoproxy member MUSt be supplied if mode is set to "member"');

		if(errors.length) throw new Error(errors.join("\n"));

		return settings;
	}
}
const apVals = [
	'off',
	'front',
	'latch',
	'member'
]

const KEYS = {
	guild: { },
	proxying_enabled: {
		transform: (v) => v ? true : false
	},
	autoproxy_mode: {
		test: (s) => apVals.includes(s),
		err: `Valid autoproxy mode values: ${apVals.join(", ")}`
	},
	autoproxy_member: { },
	tag: {
		test: (s) => s.length <= 79,
		err: 'Server tag must be 79 characters or less'
	},
	tag_enabled: {
		transform: (v) => v ? true : false
	}
}

module.exports = class SystemGuildSettings {
	#api;

	constructor(api, data = { }) {
		this.#api = api;
		for(var k in data) {
			if(KEYS[k]) {
				if(KEYS[k].init) data[k] = KEYS[k].init(data[k]);
				this[k] = data[k];
			}
		}
	}

	async patch(token) {
		var data = await this.#api.patchSystemGuildSettings({...this, token});
		for(var k in data) if(KEYS[k]) this[k] = data[k];
		return this;
	}

	async verify() {
		var settings = {};
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
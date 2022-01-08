const { rawTimeZones } = require('@vvo/tzdb');

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

const KEYS = {
	timezone: {
		test: (t) => findTz(t),
		err: "Timezone must be valid",
		transform: (t) => {
			var raw = findTz(t)
			return raw.abbreviation.replace('GMT','UTC');
		}
	},
	pings_enabled: {
		transform: (v) => v ? true : false
	},
	latch_timeout: {
		test: (v) => !isNaN(v)
	},
	member_default_private: {
		transform: (v) => v ? true : false
	},
	group_default_prviate: {
		transform: (v) => v ? true : false
	},
	member_limit: { },
	group_limit: { }
}

module.exports = class SystemSettings {
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
		var data = await this.#api.patchSystemSettings({...this, token});
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

		if(errors.length) throw new Error(errors.join("\n"));

		return settings;
	}
}
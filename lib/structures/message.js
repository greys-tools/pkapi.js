const Member = require("./member.js");
const System = require("./system.js");

const KEYS = {
	timestamp: {
		init: (t) => new Date(t)
	},
	id: { },
	original: { },
	sender: { },
	channel: { },
	system: {
		init: (s, api) => s ? new System(api, s) : null
	},
	member: {
		init: (m, api) => m ? new Member(api, m) : null
	}
}

module.exports = class Message {
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
}
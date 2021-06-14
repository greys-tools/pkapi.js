import Member from "./member.js";
import System from "./system.js";

const KEYS = {
	timestamp: {
		init: (t) => new Date(t)
	},
	id: {},
	original: {},
	channel: {},
	sender: {},
	system: {
		init: (s, api) => new System(api, s)
	},
	member: {
		init: (m, api) => new Member(api, m)
	}
}

export default class Message {
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
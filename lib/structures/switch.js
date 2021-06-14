import Member from "./member.js";

const KEYS = {
	timestamp: {
		init: (t) => new Date(t)
	},
	members: {}
}

export default class Switch {
	#api;
	
	constructor(api, data) {
		this.#api = api;
		if(!data.timestamp || !data.members)
			throw new Error("Switch objects require a timestamp and members key");

		for(var k in data) {
			if(KEYS[k]) {
				if(KEYS[k].init) data[k] = KEYS[k].init(data[k]);
				this[k] = data[k];
			}
		}
	}

	// to be implemented (api v2?)
	// async patch() {}
	// async delete() {}
}
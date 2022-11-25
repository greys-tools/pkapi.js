import Member from "./member";
import System from "./system";

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
export default class Message {
	#api;

	timestamp: Date | string;
	id: string;
	original?: string;
	sender: string;
	channel: string;
	system?: string | System;
	member?: string | Member;
	
	constructor(api, data: Partial<Message>) {
		this.#api = api;
		for(var k in data) {
			if(KEYS[k]) {
				if(KEYS[k].init) data[k] = KEYS[k].init(data[k]);
				this[k] = data[k];
			}
		}
	}
}
import Member from "./member";

const KEYS = {
	id: { },
	timestamp: {
		init: (t) => new Date(t),
		// transform: (d) => d.toISOString()
	},
	members: {
		transform: (mems) => {
			var arr = [];
			if(mems.values) for(var m of mems.values()) arr.push(m.id ?? m);
			else arr = mems.map(m => m.id ?? m);
			return arr;
		}
	}
}
export default class Switch {
	#api;

	id: string;
	timestamp: Date | string;
	members?: Map<Member> | Array<string>;
	
	constructor(api, data: Partial<Switch>) {
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

	async patchTimestamp(timestamp: Date, token?: string) {
		var data = await this.#api.patchSwitchTimestamp({switch: this.id, timestamp, token});
		for(var k in data) if(KEYS[k]) this[k] = data[k];
		return this;
	}

	async patchMembers(token?: string, members?: Array<string>) {
		var data = await this.#api.patchSwitchMembers({switch: this.id, members, token});
		for(var k in data) if(KEYS[k]) this[k] = data[k];
		return this;
	}

	async delete(token?: string) {
		return await this.#api.deleteSwitch({switch: this.id, token});
	}

	async verify() {
		var sw = {};
		var errors = [];
		for(var k in KEYS) {
			if(this[k] == null) {
				sw[k] = this[k];
				continue;
			}
			if(this[k] == undefined) continue;
			
			var test = true;
			if(KEYS[k].test) test = await KEYS[k].test(this[k]);
			if(!test) {
				errors.push(KEYS[k].err);
			}
			if(KEYS[k].transform) this[k] = KEYS[k].transform(this[k]);
			sw[k] = this[k];
		}

		if(errors.length) throw new Error(errors.join("\n"));

		return sw;
	}
}
import axios from 'axios';

import System from './lib/structures/system.js';
import Member from './lib/structures/member.js';
import Switch from './lib/structures/switch.js';
import Message from './lib/structures/message.js';

import ROUTES from './lib/routes.js';

export default class PKAPI {
	#token;
	#inst;
	#_base;
	#_version;
	
	constructor(opts = {}) {
		this.#_base = opts.base_url || 'https://api.pluralkit.me';
		this.#_version = opts.version || 1;
		this.#token = opts.token;

		this.#inst = axios.create({
			validateStatus: (s) => s < 300 && s > 100,
			baseURL: `${this.#_base}/v${this.#_version}`
		})
	}

	/*
	**			SYSTEM FUNCTIONS
	*/
	
	async getSystem(opts = {}) {
		var token = this.#token || opts.token;
		if(!opts.id && !token) throw new Error('Must provide a token or ID');
		var sys;
		var resp;
		try {
			if(token) {
				resp = await this.handle("get", ROUTES.GET_SYSTEM(), {token});
				if(resp.status == 200) sys = new System(this, resp.data);
				else throw new Error(resp.data);
			} else {
				if(opts.id.length > 10) resp = await this.handle("get", ROUTES.GET_ACCOUNT(opts.id));
				else resp = await this.handle("get", ROUTES.GET_SYSTEM(opts.id));
				if(resp.status == 200) sys = new System(this, resp.data);
				else throw new Error(resp.data);
			}

			if(opts.fetch) {
				if(opts.fetch.includes("members")) sys.members = await sys.getMembers(token);
				if(opts.fetch.includes("fronters")) sys.fronters = await sys.getFronters(token);
				if(opts.fetch.includes("switches")) sys.switches = await sys.getSwitches(token, opts.raw);
			}
		} catch(e) {
			throw new Error(resp.data || e);
		}

		return sys;
	}

	async getAccount(opts = {}) {
		return await this.getSystem(opts);
	}

	async patchSystem(data = {}) {
		var token = this.#token || data.token;
		if(!token) throw new Error("PATCH requires token");

		try {
			var sys = data instanceof System ? data : new System(this, data);
			var body = await sys.verify();
			sys = await this.handle("patch", ROUTES.PATCH_SYSTEM(), {token, body});
		} catch(e) {
			throw new Error(e || resp.data)
		}

		return new System(this, sys.data);
	}

	/*
	**			MEMBER FUNCTIONS
	*/

	async createMember(data = {}) {
		var token = this.#token || data.token;
		if(!token) throw new Error("POST requires token");

		try {
			var mem = new Member(this, data);
			var body = await mem.verify();
			mem = await this.handle("post", ROUTES.ADD_MEMBER(), {token, body});
		} catch(e) {
			throw new Error(e || resp.data)
		}

		return new Member(this, mem.data);
	}

	async getMember(opts = {}) {
		if(!opts.id) throw new Error('Must provide a member ID');
		var token = this.#token || opts.token;
		try {
			var resp = await this.handle("get", ROUTES.GET_MEMBER(opts.id), {token});
		} catch(e) {
			throw new Error(e || resp.data);
		}

		return new Member(this, resp.data);
	}

	async getMembers(opts = {}) {
		if(!opts.id) throw new Error('Must provide a system ID');
		var token = this.#token || opts.token;
		try {
			var resp = await this.handle("get", ROUTES.GET_MEMBERS(opts.id), {token});
		} catch(e) {
			throw new Error(e || resp.data);
		}

		var mems = resp.data.map(m => [m.id, new Member(this, m)]);
		return new Map(mems);
	}

	async patchMember(data = {}) {
		if(!data.id) throw new Error("Must provide a member ID");
		var token = this.#token || data.token;
		if(!token) throw new Error("PATCH requires token");

		try {
			var mem = data instanceof Member ? data : new Member(this, data);
			var body = await mem.verify();
			mem = await this.handle("patch", ROUTES.PATCH_MEMBER(data.id), {token, body});
		} catch(e) {
			throw new Error(e || resp.data)
		}

		return new Member(this, mem.data);
	}

	async deleteMember(opts = {}) {
		if(!opts.id) throw new Error('Must provide a member ID');
		var token = this.#token || opts.token;
		if(!token) throw new Error("DELETE requires token");
		try {
			var resp = await this.handle("get", ROUTES.DELETE_MEMBER(opts.id), {token});
		} catch(e) {
			throw new Error(resp.data || e);
		}

		return null;
	}

	/*
	**			SWITCH FUNCTIONS
	*/

	async createSwitch(opts = {}) {
		var token = this.#token || opts.token;
		if(!token) throw new Error("POST requires tokwn");

		var body = {members: []};
		if(opts.members) {
			for(var m of opts.members) {
				if(m.id) body.members.push(m.id)
				else body.members.push(m)
			}
		}
		try {
			var resp = await this.handle("post", ROUTES.ADD_SWITCH(), {token, body})
		} catch(e) {
			throw new Error(resp.data || e)
		}

		return;
	}

	async getSwitches(opts = {}) {
		if(!opts.id) throw new Error('Must provide a system ID');
		var token = this.#token || opts.token;
		try {
			var resp = await this.handle("get", ROUTES.GET_SWITCHES(opts.id), {token});
			if(!opts.raw) var membs = await this.handle("get", ROUTES.GET_MEMBERS(opts.id), {token})
		} catch(e) {
			throw new Error(resp.data || e);
		}

		if(!opts.raw) {
			membs = new Map(membs.data.map(m => [m.id, new Member(this, m)]));
			var switches = [];
			for(var s of resp.data) {
				var members = new Map();
				for(var m of s.members) if(membs.get(m)) members.set(m, membs.get(m));
				s.members = members;
				switches.push(new Switch(this, s))
			}
			return switches;
		} else return resp.data.map(s => new Switch(this, s));
	}

	async getFronters(opts = {}) {
		if(!opts.id) throw new Error('Must provide a system ID');
		var token = this.#token || opts.token;
		try {
			var resp = await this.handle("get", ROUTES.GET_FRONTERS(opts.id), {token});
		} catch(e) {
			throw new Error(resp.data || e);
		}

		return new Switch(this, resp.data);
	}

	/*
	** 			MISC FUNCTIONS
	*/

	async getMessage(opts = {}) {
		if(!opts.id) throw new Error("Must provide a message id");
		var token = this.#token || opts.token;
		try {
			var resp = await this.handle("get", ROUTES.GET_MESSAGE(opts.id), {token});
		} catch(e) {
			throw new Error(resp.data || e);
		}

		return new Message(this, resp.data);
	}

	/*
	**			BASE STUFF
	*/

	async handle(method, path, options = {}) {
		var headers = options.headers || {};
		var request = {method, headers};
		var token = this.#token || options.token;
		if(token) request.headers["Authorization"] = token;

		if(options.body) {
			request.headers["content-type"] = "application/json";
	        request.data = JSON.stringify(options.body);
		}

		try {
			var resp = await this.#inst(path, request);
		} catch(e) {
			resp = {error: e.message};
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
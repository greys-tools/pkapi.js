import axios from 'axios';

import System from './lib/structures/system.js';
import Member from './lib/structures/member.js';
// import Switch from './lib/structures/switch';

import ROUTES from './lib/routes.js';

export default class PKAPI {
	#token;

	constructor(options = {}) {
		this._base = options.base_url || 'https://api.pluralkit.me';
		this._version = options.version || 1;
		this.#token = options.token;

		this.inst = axios.create({
			validateStatus: (s) => s < 500,
			baseURL: `${this._base}/v${this._version}`
		})
	}

	async getSystem(opts) {
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
			throw new Error(e.message || e)
		}

		return sys;
	}

	async getAccount(opts) {
		return await this.getSystem(opts);
	}

	async getMember(opts) {
		if(!opts.id) throw new Error('Must provide an ID');
		var token = this.#token || opts.token;
		try {
			var resp = await this.handle("get", ROUTES.GET_MEMBER(this.id), {token});
			if(resp) var mem = new Member(this, resp.data);
		} catch(e) {
			throw new Error(e.message || e);
		}

		return mem;
	}

	set base_url(s) {
		this._base = s;
		this.inst.defaults.baseURL = `${this._base}/v${this._version}`;
	}

	get base_url() {
		return this._base;
	}

	set version(n) {
		this._version = n;
		this.inst.defaults.baseURL = `${this._base}/v${this._version}`;
	}

	get version() {
		return this._version;
	}

	set token(t) {
		this.#token = token;
	}

	get token() {
		return this.#token;
	}

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
			var resp = await this.inst(path, request);
		} catch(e) {
			resp = {error: e.message};
		}

		return resp;
	}
}
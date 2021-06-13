import axios from 'axios';

import System from './lib/structures/system.js';
import Member from './lib/structures/member.js';
// import Switch from './lib/structures/switch';

import ROUTES from './lib/routes.js';

export default class PKAPI {
	constructor(options = {}) {
		this._base = options.base_url || 'https://api.pluralkit.me';
		this._version = options.version || 1;

		this.inst = axios.create({
			validateStatus: (s) => s < 500,
			baseURL: `${this._base}/v${this._version}`
		})
	}

	async getSystem(opts) {
		if(!opts.id && !opts.token) return Promise.reject('Must provide a token or id');
		var sys;
		var resp;
		try {
			if(opts.token) {
				var start = Date.now();
				resp = await this.handle("get", ROUTES.GET_SYSTEM(), {
					headers: { 'Authorization': opts.token }
				});
				var end = Date.now();
				console.log(`Request time: ${end - start}ms`)
				if(resp.status == 200) sys = new System(this, resp.data);
				else throw new Error(resp.data);
			} else {
				var start = Date.now();
				if(opts.id.length > 10) resp = await this.handle("get", ROUTES.GET_ACCOUNT(opts.id));
				else resp = await this.handle("get", ROUTES.GET_SYSTEM(opts.id));
				var end = Date.now();
				console.log(`Request time: ${end - start}ms`)
				if(resp.status == 200) sys = new System(this, resp.data);
				else throw new Error(resp.data);
			}

			if(opts.fetch) {
				if(opts.fetch.includes("members")) await sys.getMembers(opts.token);
				if(opts.fetch.includes("fronters")) await sys.getFronters(opts.token);
				if(opts.fetch.includes("switches")) await sys.getSwitches(opts.token);
			}
		} catch(e) {
			throw new Error(e)
		}

		return sys;
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

	async handle(method, path, options = {}) {
		var headers = options.headers || {};
		var request = {method, headers};
		if(options.token) request.headers["Authorization"] = options.token;

		if(options.body) {
			request.headers["content-type"] = "application/json";
	        request.data = JSON.stringify(req.body);
		}

		try {
			var resp = await this.inst(path, request);
		} catch(e) {
			resp = {error: e.message};
		}

		return resp;
	}
}
module.exports = class APIError {
	constructor(api, data = {}) {
		this.api = {
			baseURL: api.base_url,
			token: api.token,
			version: api.version
		};
		this.status = data.status || '???';
		this.message = data.data || data.message || "Unknown error.";
		this.statusText = data.statusText || "Unknown error.";
		this.headers = data.headers || {};
	}
}
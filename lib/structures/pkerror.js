module.exports = class PKError {
	constructor(api, data = {}) {
		this.api = api;
		this.status = data.status || '???';
		this.message = data.data || data.message || "Unknown error.";
		this.statusText = data.statusText || "Unknown error.";
		this.headers = data.headers || {};
		this.raw = data;
	}
}
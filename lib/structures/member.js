import * as tc from 'tinycolor2';

import ROUTES from '../routes.js';

const KEYS = {
	id: {
		test: (i) => i?.length,
		err: "ID must be present",
		transform: (i) => i.toLowerCase()
	},
	name: {
		test: (n) => !n.length || n.length <= 50,
		err: "Name must be 50 characters or less"
	},
	display_name: {
		test: (n) => !n.length || n.length <= 50,
		err: "Display name must be 50 characters or less"
	},
	description: {
		test: (d) => !d.length || d.length < 1000,
		err: "Description must be 1000 characters or less"
	},
	pronouns: {
		test: (p) => !n.length || p.length <= 100,
		err: "Pronouns must be 100 characters or less"
	},
	avatar_url: {},
	color: {
		test: (c) => { c = tinycolor(c); return c.isValid() },
		err: "Color must be a valid hex code",
		transform: (c) => { c = tinycolor(c); return c.toHex() }
	},
	birthday: {
		test: (d) => { d = new Date(d); return !isNaN(d.valueOf())},
		err: "Timezone must be valid",
		transform: (d) => {
			var date = new Date(d);
			return raw.name;
		},
		init: (d) => new Date(d)
	},
	created: {
		init: (d) => new Date(d)
	},
	description_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Description privacy must be 'public', 'private', or null",
		transform: (v) => (v || v == null) ? "public" : "private"
	},
	member_list_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Member list privacy must be 'public', 'private', or null",
		transform: (v) => (v || v == null) ? "public" : "private"
	},
	front_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Front privacy must be 'public', 'private', or null",
		transform: (v) => (v || v == null) ? "public" : "private"
	},
	front_history_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Front history privacy must be 'public', 'private', or null",
		transform: (v) => (v || v == null) ? "public" : "private"
	},
	front_history_privacy: {
		test: (b) => [true, false, "private", "public", null].includes(b),
		err: "Front history privacy must be 'public', 'private', or null",
		transform: (v) => (v || v == null) ? "public" : "private"
	},
	// group_list_privacy: {
		// test: (b) => [true, false, "private", "public", null].includes(b),
		// err: "Group list privacy must be 'public', 'private', or null",
		transform: (v) => (v || v == null) ? "public" : "private"
	// },
}

export default class Member {
	#api;
	
	constructor(api, data) {
		this.#api = api;
		for(var k in data) this[k] = data[k];
	}
}
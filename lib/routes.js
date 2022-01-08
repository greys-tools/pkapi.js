const ROUTES = {
	1: {
		GET_SYSTEM: (sid) => ({method: 'GET', route: `/s/${sid}`}),
		GET_OWN_SYSTEM: () => ({method: 'GET', route: `/s`}),
		GET_ACCOUNT: (aid) => ({method: 'GET', route: `/a/${aid}`}),
		PATCH_SYSTEM: () => ({method: 'PATCH', route: `/s`}),

		ADD_MEMBER: () => ({method: 'POST', route: `/m`}),
		GET_MEMBER: (mid) => ({method: 'GET', route: `/m/${mid}`}),
		GET_MEMBERS: (sid) => ({method: 'GET', route: `/s/${sid}/members`}),
		PATCH_MEMBER: (mid) => ({method: 'PATCH', route: `/m/${mid}`}),
		DELETE_MEMBER: (mid) => ({method: 'DELETE', route: `/m/${mid}`}),

		ADD_SWITCH: () => ({method: 'POST', route: `/s/switches`}),
		GET_SWITCHES: (sid) => ({method: 'GET', route: `/s/${sid}/switches`}),
		GET_FRONTERS: (sid) => ({method: 'GET', route: `/s/${sid}/fronters`}),

		GET_MESSAGE: (mid) => ({method: 'GET', route: `/msg/${mid}`})
	},
	2: {
		GET_SYSTEM: (sid) => ({method: 'GET', route: `/systems/${sid}`}),
		GET_OWN_SYSTEM: () => ({method: 'GET', route: `/systems/@me`}),
		GET_ACCOUNT: (sid) => ({method: 'GET', route: `/systems/${sid}`}),

		ADD_MEMBERS: () => ({method: 'POST', route: `/members`}),
		GET_MEMBER: (mid) => ({method: 'GET', route: `/members/${mid}`}),
		GET_MEMBERS: (sid) => ({method: 'GET', route: `/systems/${sid}/members`}),
		PATCH_MEMBER: (mid) => ({method: 'PATCH', route: `/members/${mid}`}),
		DELETE_MEMBER: (mid) => ({method: 'DELETE', route: `/members/${mid}`}),

		ADD_GROUP: () => ({method: 'POST', route: `/groups`}),
		GET_GROUPS: (sid) => ({method: 'GET', route: `/systems/${sid}/groups`}),
		GET_GROUP: (gid) => ({method: 'GET', route: `/groups/${gid}`}),
		PATCH_GROUP: (gid) => ({method: 'PATCH', route: `/groups/${gid}`}),
		DELETE_GROUP: (gid) => ({method: 'DELETE', route: `/groups/${gid}`}),

		GET_GROUP_MEMBERS: (gid) => ({method: 'GET', route: `/groups/${gid}/members`}),
		ADD_GROUP_MEMBERS: (gid) => ({method: 'POST', route: `/groups/${gid}/members/add`}),
		REMOVE_GROUP_MEMBERS: (gid) => ({method: 'POST', route: `/groups/${gid}/members/remove`}),
		SET_GROUP_MEMBERS: (gid) => ({method: 'POST', route: `/groups/${gid}/members/overwrite`}),

		GET_MEMBER_GROUPS: (mid) => ({method: 'GET', route: `/members/${mid}/groups`}),
		ADD_MEMBER_GROUPS: (mid) => ({method: 'POST', route: `/members/${mid}/groups/add`}),
		REMOVE_MEMBER_GROUPS: (mid) => ({method: 'POST', route: `/members/${mid}/groups/remove`}),
		SET_MEMBER_GROUPS: (mid) => ({method: 'POST', route: `/members/${mid}/groups/overwrite`}),

		ADD_SWITCH: () => ({method: 'POST', route: `/systems/@me/switches`}),
		GET_SWITCHES: (sid) => ({method: 'GET', route: `/systems/${sid}/switches`}),
		GET_FRONTERS: (sid) => ({method: 'GET', route: `/systems/${sid}/fronters`}),
		GET_SWITCH: (sid, swid) => ({method: 'GET', route: `/systems/${sid}/switches/${swid}`}),
		PATCH_SWITCH: (swid) => ({method: 'PATCH', route: `/systems/@me/switches/${swid}`}),
		PATCH_SWITCH_MEMBERS: (swid) => ({method: 'PATCH', route: `/systems/@me/switches/${swid}/members`}),
		DELETE_SWITCH: (swid) => ({method: 'DELETE', route: `/systems/@me/switches/${swid}`}),

		GET_SYSTEM_SETTINGS: () => ({method: 'GET', route: `/systems/@me/settings`}),
		PATCH_SYSTEM_SETTINGS: () => ({method: 'PATCH', route: `/systems/@me/settings`}),
		GET_SYSTEM_GUILD_SETTINGS: (gid) => ({method: 'GET', route: `/systems/@me/guilds/${gid}`}),
		PATCH_SYSTEM_GUILD_SETTINGS: (gid) => ({method: 'PATCH', route: `/systems/@me/guilds/${gid}`}),
		GET_MEMBER_GUILD_SETTINGS: (mid, gid) => ({method: 'GET', route: `/members/${mid}/guilds/${gid}`}),
		PATCH_MEMBER_GUILD_SETTINGS: (mid, gid) => ({method: 'PATCH', route: `/members/${mid}/guilds/${gid}`}),

		GET_MESSAGE: (mid) => ({method: 'GET', route: `/messages/${mid}`})
	}
}

module.exports = ROUTES;
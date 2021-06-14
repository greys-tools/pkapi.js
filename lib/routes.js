const ROUTES = {
	GET_SYSTEM: (sid) => sid ? `/s/${sid}` : `/s`,
	GET_ACCOUNT: (aid) => `/a/${ais}`,
	PATCH_SYSTEM: () => `/s`,

	ADD_MEMBER: () => `/m`,
	GET_MEMBER: (mid) => `/m/${mid}`,
	GET_MEMBERS: (sid) => `/s/${sid}/members`,
	PATCH_MEMBER: (mid) => `/m/${mid}`,
	DELETE_MEMBER: (mid) => `/m/${mid}`,

	ADD_SWITCH: () => `/s/switches`,
	GET_SWITCHES: (sid) => `/s/${sid}/switches`,
	GET_FRONTERS: (sid) => `/s/${sid}/fronters`,

	GET_MESSAGE: (mid) => `/msg/${mid}`
}

export default ROUTES;
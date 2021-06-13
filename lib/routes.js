const ROUTES = {
	GET_SYSTEM: (sid) => sid ? `/s/${sid}` : `/s`,
	PATCH_SYSTEM: () => `/s`,

	CREATE_MEMBER: () => `/m`,
	GET_MEMBER: (mid) => `/m/${mid}`,
	GET_MEMBERS: (sid) => `/s/${sid}/members`,
	DELETE_MEMBER: (mid) => `/m/${mid}`,

	GET_SWITCHES: (sid) => `/s/${sid}/switches`,
	GET_FRONTERS: (sid) => `/s/${sid}/fronters`,
	ADD_SWITCH: () => `/s/switches`,

	GET_ACCOUNT: (aid) => `/a/${ais}`,
	GET_MESSAGE: (mid) => `/msg/${mid}`
}

export default ROUTES;
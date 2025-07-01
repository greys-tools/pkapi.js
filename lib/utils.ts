export function validatePrivacy(keys: Array<string>, obj: any) {
	var priv: any = {};
	for(var k of keys) {
		if(obj[k] == undefined) continue;
		if(['private', 'public'].includes(obj[k])) {
			priv[k] = obj[k];
			continue;
		}

		priv[k] = obj[k] ? 'public' : 'private';
	}

	return priv;
}

export function formatDate(D: Date) {
	var y = ('000' + D.getFullYear()).slice(-4);
	var m = ("0" + (D.getMonth() + 1)).slice(-2);
	var d = ("0" + (D.getDate())).slice(-2);

	return `${y}-${m}-${d}`;
}
module.exports = {
	validatePrivacy(keys, obj) {
		var priv = {}
		for(var k of keys) {
			if(obj[k] == null) continue;
			if(['private', 'public'].includes(obj[k])) continue;

			priv[k] = obj[k] ? 'public' : 'private';
		}
		
		return priv;
	},
	formatDate(d) {
		var y = ('000' + d.getFullYear()).slice(-4);
		var m = ("0" + (d.getMonth() + 1)).slice(-2);
		var d = ("0" + (d.getDate())).slice(-2);

		return `${y}-${m}-${d}`;
	}
}
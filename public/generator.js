function genPass () {
    let len = 8
	let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	res = ''
	for (let i = 0, n = charset.length; i < len; ++i) {
		res += charset[(Math.floor(Math.random() * n))]
	}
	return res;
}

module.exports = genPass()
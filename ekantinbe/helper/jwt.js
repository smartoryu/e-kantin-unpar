const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = payload => {
	let privateKEY = fs.readFileSync('./private.key', 'utf8');
	return jwt.sign(payload, privateKEY, { expiresIn: '6h', algorithm: 'RS256' });
};

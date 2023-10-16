const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const protect = asyncHandler(async (req, res, next) => {
	let token;
	const { authorization } = req.headers;

	if (authorization && authorization.startsWith('Bearer')) {
		try {
			token = authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Access Denied');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Access Denied, no token');
	}
});

module.exports = { protect };

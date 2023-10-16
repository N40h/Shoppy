const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

// @desc    Register user
// @route   POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error('All fields are required');
	}
	if (!validator.isEmail(email)) {
		throw new Error('Please enter a valid email');
	}
	if (!validator.isStrongPassword(password)) {
		throw new Error(
			'Your Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number and one symbol'
		);
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await User.create({
		email,
		password: hash,
	});

	if (user) {
		res.status(201).json({
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
	loginUser,
	registerUser,
};

const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('item', itemSchema);

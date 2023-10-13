const asyncHandler = require('express-async-handler');
const itemModel = require('../models/shopping-list.model');
const mongoose = require('mongoose');

// @desc    Get all items
// @route	GET /api/shopping-list
// @access	Private
const getItems = asyncHandler(async (req, res) => {
	const items = await itemModel.find();
	res.status(200).json(items);
});

// @desc    Add a new item
// @route	GET /api/shopping-list/:id
// @access Private
const getItem = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: `We couldn't found this item` });
	}

	const item = await itemModel.findById(id);

	if (!item) {
		return res.status(404).json({ error: `We couldn't found this item` });
	}

	res.status(200).json(item);
});

// @desc	Create a new item
// @route	POST /api/shopping-list
// @access  Private
const createItem = asyncHandler(async (req, res) => {
	const { name } = req.body;

	if (!name) {
		res.status(400).json({ message: 'Add a name please' });
	}

	const item = await itemModel.create({
		name: req.body.name,
	});
	res.status(201).json(item);
});

// @desc	Delete an item
// @route	DELETE /api/shopping-list/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: `We couldn't found this item` });
	}

	const item = await itemModel.findByIdAndDelete({ _id: id });

	if (!item) {
		return res.status(404).json({ error: `We couldn't found this item` });
	}
	res.status(200).json(item);
});

module.exports = {
	getItems,
	getItem,
	createItem,
	deleteItem,
};

const asyncHandler = require('express-async-handler');
const itemModel = require('../models/shopping-list.model');
const mongoose = require('mongoose');

const getItems = asyncHandler(async (req, res) => {
	const items = await itemModel.find();
	res.status(200).json(items);
});

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

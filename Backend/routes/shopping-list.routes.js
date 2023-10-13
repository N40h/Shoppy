const express = require('express');
const {
	getItems,
	getItem,
	createItem,
	deleteItem,
} = require('../controllers/shopping-list.controllers');
const router = express.Router();

// GET /shopping-list => Gets all shopping list items
router.get('/', getItems);

// GET /shopping-list/:id => Get an item
router.get('/:id', getItem);

// POST /shopping-list => Creates a new item
router.post('/', createItem);

// DELETE /shopping-list/:id => Delete an item
router.delete('/:id', deleteItem);

module.exports = router;

const express = require('express');
const {
	getItems,
	getItem,
	createItem,
	deleteItem,
} = require('../controllers/shopping-list.controllers');
const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', createItem);
router.delete('/:id', deleteItem);

module.exports = router;

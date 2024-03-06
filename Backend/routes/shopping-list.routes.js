const express = require('express');
const {
	getItems,
	getItem,
	createItem,
	deleteItem,
} = require('../controllers/shopping-list.controllers');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect); // Apply authentication middleware to all routes in this file
router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', createItem);
router.delete('/:id', deleteItem);

module.exports = router;

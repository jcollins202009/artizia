const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/categoryController');
const db = require('../models/db');

console.log('made it into category router');

// get a single category by id
router.get('/:id', category_controller.category_listbyid);

// list all categories
router.get('/', category_controller.category_list);

// create a category
router.post('/', category_controller.category_create);

module.exports = router
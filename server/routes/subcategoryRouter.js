const express = require('express');
const router = express.Router();
const subcategory_controller = require('../controllers/subcategoryController');
const db = require('../models/db');

console.log('made it into subcategory router');

// get all subcategories by category
router.get('/bycategory/:catid', subcategory_controller.subcategory_listbycategory);

// get a single subcategory by id
router.get('/:id', subcategory_controller.subcategory_listbyid);

// get all subcategories
router.get('/', subcategory_controller.subcategory_list);

// create a new category
router.post('/', subcategory_controller.subcategory_create);

module.exports = router
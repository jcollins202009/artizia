const jwt = require('jsonwebtoken')
const dbConfig = require("../config/db.config.js");
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

const categoryModel = require("../models/categoryModel.js");

console.log('made it into category controller');

exports.category_list = (req, res) => {

  // Find all categories
  categoryModel.category_list(req, (err, data) => {
    
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding categories"
    });
    else res.send(data);
  });
};

// Get category by id
exports.category_listbyid = (req, res) => {
  console.log('List category by id');
  console.log('category controller params: ', req.params)
  // find all categories with specify cataegory
  categoryModel.category_listbyid(req, (err, data) => {
    
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding category by id"
    });
    else res.send(data);
  });
};

exports.category_create = (req, res) => {

  console.log('category_create: ', req.body)

  // Validate request
  if (Object.keys(req.body).length === 0) {
    console.log('req.body is empty')
    res.status(400).send({
      message: "Category can not be empty!"
    })
    return
  }
  
  const newCategory = new categoryModel({
    name:req.body.name,
  });

  console.log('controller newCategory :', newCategory)
  console.log('controller category new: ', newCategory, req.body)

   // Save category in database
  categoryModel.category_create_post(newCategory, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    } else {
      res.send({data});}
  });
};

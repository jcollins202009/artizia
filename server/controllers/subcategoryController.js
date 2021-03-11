const jwt = require('jsonwebtoken')
const dbConfig = require("../config/db.config.js");
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

const subcategoryModel = require("../models/subcategoryModel.js");

console.log('made it into subcategory controller');

// list all subcategories
exports.subcategory_list = (req, res) => {

  // find subcategories
  subcategoryModel.subcategory_list(req, (err, data) => {
    
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding subcategories."
    });
    else res.send(data);
  });
};

// Get subcategory by id
exports.subcategory_listbyid = (req, res) => {
  console.log('List subcategory by id');
  console.log('controller params: ', req.params)
  // find all subcategories with specify cataegory
  subcategoryModel.subcategory_listbyid(req, (err, data) => {
    
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding subcategory by id"
    });
    else res.send(data);
  });
};

// List all subcategories matching category id (foreign key)
exports.subcategory_listbycategory = (req, res) => {
  console.log('List subcategories by category');
  console.log('controller params: ', req.params)
  // find all subcategories with specify cataegory
  subcategoryModel.subcategory_listbycategory(req, (err, data) => {
    
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding subcategories by category."
    });
    else res.send(data);
  });
};

// Create a subcategory
exports.subcategory_create = (req, res) => {

  console.log('subcategory_create: ', req.body)
  //console.log('subcategory params: ', req.params)
  // Validate request
  if (Object.keys(req.body).length === 0) {
    console.log('req.body is empty')
    res.status(400).send({
      message: "Subcategory can not be empty!"
    })
    return
  }
  
  console.log('calling new subcategoryModel')
  const newSubcategory = new subcategoryModel({
    name:req.body.name,
    cat_id:req.body.cat_id,
  });

  console.log('controller newSubcategory :', newSubcategory)
  console.log('controller subcategory new: ', newSubcategory, req.body)

   // save subcategory in database
  subcategoryModel.subcategory_create_post(newSubcategory, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the subcategory."
      });
    } else {
      res.send({data});}
  });
};

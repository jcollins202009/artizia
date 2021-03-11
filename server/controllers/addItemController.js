const jwt = require('jsonwebtoken')
const dbConfig = require("../config/db.config.js");
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

const itemAddModel = require("../models/itemAddModel");

console.log('made it into add item controller');

exports.item_list = (req, res) => {

  // Find categories
  itemAddModel.item_list(req, (err, data) => {
    
  if (err)
    res.status(500).send({
      message:
        err.message || "Error occurred finding items list"
    });
    else res.send(data);
  });
};

exports.item_create = (req, res) => {

  console.log('item_create: ', req.body)
  console.log('user: ', req.user.idusers)
  console.log('item params: ', req.params)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Item data can not be empty!"
    });
  }

  // Create a new item object
  const newItem = new itemAddModel({
    name:req.body.name,
    categoryId:req.body.categoryId,
    subcategoryId:req.body.subcategoryId,
    createdDate:req.body.createdDate,
    drop:req.body.drop,
    price:req.body.price,
    userId:req.user.idusers,
    desc:req.body.desc,
    //name:"Testing",
  });

  console.log('controller newItem :', newItem)
  console.log('controller item new: ', newItem, req.body)

   // Save category in database
   itemAddModel.item_create_post(newItem, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the item"
      });
    } else {
      res.send({data});}
  });
};

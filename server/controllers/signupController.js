const jwt = require('jsonwebtoken')
const dbConfig = require("../config/db.config.js");
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

const Signup = require("../models/signupModel.js");
// Create and Save a new User
exports.create = (req, res) => {
   
  // Validate request
  if (!req.body) {
    
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const hash = bcrypt.hashSync(req.body.password, salt);

  // console.log(hash)
  // Create a User
  const signup = new  Signup({
    
    password:hash,
    email:req.body.email,
    lName:req.body.lName,
    fName:req.body.fName,
    location:req.body.location,
    payment:req.body.payment,
    PushTokenNotification:req.body.PushTokenNotification,
    joined: new Date(),
    status: 'Active'
  
  });
   // Save item review in the database
   Signup.create(signup, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else {
      const token = jwt.sign({userId: data.idusers}, dbConfig.jwt)
      delete data.password
      res.send({user:data, token});}
  });
};
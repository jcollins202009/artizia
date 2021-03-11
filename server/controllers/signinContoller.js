const jwt = require('jsonwebtoken')
const dbConfig = require("../config/db.config.js");
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

const SigninModel = require("../models/signinModel.js");
// const ItemModel= require("../models/item.model.js");

exports.findUser = (req, res) => {
  const {email, password} = req.body
  
  // Validate request
 
  // Create a user model
  // const signin = new  SigninModel ({
  //   email:email,
  //   password:password,
  // });

   // Find most recent items matching search term
   SigninModel.findUser(email, (err, data) => {
     
     let found = false
        if (err){
      res.status(500).send({
        message:
          err.message || "Incorrect "
      })
    } if(data.length>0){
      // if(password === data[0].password)
      const isFound = bcrypt.compareSync(password, data[0].password);
        found = isFound
      //  console.log(data[0])
          if(found){
            const token = jwt.sign({userId: data[0].idusers}, dbConfig.jwt)
            const user = data[0]
            delete user.password
            res.send({token, user});
          }       
      
 
          }
          if(!found){
            res.status(422).send({error:'incorrect credentials'})
          }
          
        }
  );
};
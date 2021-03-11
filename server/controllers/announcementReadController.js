const jwt = require('jsonwebtoken')
const dbConfig = require("../config/db.config.js");
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

const AnnouncementModel = require("../models/announcementReadModel.js");
// const ItemModel= require("../models/item.model.js");

exports.readMessage = (req, res) => {
  const {email, password} = req.body
  
  // Validate request
 
  // Create a user model
  // const announcementRead = new  AnnouncementModel ({
  //   email:email,
  //   password:password,
  // });

   // Find most recent items matching search term
   AnnouncementModel.readMessage(email, (err, data) => {
    
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while finding most recent items by category matching search term."
          });
        else res.send(data);
      });
    };
  
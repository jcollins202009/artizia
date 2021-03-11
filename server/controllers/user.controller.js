const jwt = require('jsonwebtoken')
const dbConfig = require("../config/db.config.js");
const UserModel = require("../models/user.model.js");

exports.findallTokenotification = (req, res) => {
  
    UserModel.findallTokenotification((err, data) => {
    
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Token notification not found.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving token notification"
          });
        }
      } else res.send(data);
    });
}
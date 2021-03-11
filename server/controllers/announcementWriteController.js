const dbConfig = require("../config/db.config.js");


const AnnouncementWrite = require("../models/announcementWriteModel.js");
// Create and Save a new Announcement
exports.create = (req, res) => {
   console.log(req.body)
  // Validate request
  if (!req.body) {
    
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  // Create a Announcement
  const announcement = new  AnnouncementWrite({
    
    title:req.body.title,
    message:req.body.message,
    expiredDate:new Date(req.body.expiredDate),
    dateEntered: new Date(),
    
  
  });
   // Save item review in the database
   AnnouncementWrite.create(announcement, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else {
      
      res.send({data});}
  });
};
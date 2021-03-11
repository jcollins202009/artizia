const ItemReview = require("../models/itemreview.model.js");
// Create and Save a new item review
exports.create = (req, res) => {
   
  // Validate request
  if (!req.body) {
    
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a item review
  const itemreview = new  ItemReview({
    shortDescription:req.body.shortDescription,
    itemRating:req.body.itemRating,
    itemReview:req.body.itemReview,
    id_item:req.body.id_item,
  

  });
   // Save item review in the database
   ItemReview.create(itemreview, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the item review."
      });
    else res.send(data);
  });
};
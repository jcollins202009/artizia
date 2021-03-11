const SellerReview = require("../models/sellerreview.model.js");
// Create and Save a new seller review
exports.create = (req, res) => {
   
  // Validate request
  if (!req.body) {
    
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a seller review
  const sellerreview = new  SellerReview({
    name:req.body.name,
    sellerRating:req.body.sellerRating,
    sellerReview:req.body.sellerReview,
  
  });
   // Save item review in the database
   SellerReview.create(sellerreview, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the seller review."
      });
    else res.send(data);
  });
};
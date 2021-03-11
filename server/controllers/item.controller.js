const ItemModel= require("../models/item.model.js");
// Find Items with a userId
exports.findUserItem= (req, res) => {
 
  ItemModel.findByUserId(req.user.idusers, (err, data) => {
 
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.user.idusers}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Item with userId " + req.user.idusers
        });
      }
    } else res.send(data);
  });
};
// Delete a Myitem with the specified userId and itemId in the request
exports.deleteMyitem = (req, res) => {
  ItemModel.delete(req.params.itemid,req.params.userid, (err, data) => {
    console.log("deletemyitem....model>>" + req.params.itemid);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Item with id ${req.params.itemid}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete My item with id " + req.params.itemid
        });
      }
    } else res.send({ message: `My item was deleted successfully!` });
  });
};

exports.findMostRecentItemsByCategoryMatchingSearchTerm = (req, res) => {   
  // Validate request
//   if (!req.params.searchTerm) {
    
//     res.status(400).send({
//       message: "Need search term!"
//     });
//   }
  // Create a category model
//   const categoryModel = new  CategoryModel ({
//     id:req.params.id,
//     name:req.params.name,
//   });

   // Find most recent items matching search term
   ItemModel.findMostRecentItemsByCategoryMatchingSearchTerm(req.params.searchTerm, req.params.numberOfMostRecentItems, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding most recent items by category matching search term."
      });
    else res.send(data);
  });
};

exports.findMostRecentItemsByCategoryMatchingSearchCriteria = (req, res) => { 
  // Find most recent items matching search criteria
  ItemModel.findMostRecentItemsByCategoryMatchingSearchCriteria(req.params.searchTerm, req.params.categoryId, req.params.numberOfMostRecentItems, (err, data) => {
   if (err)
     res.status(500).send({
       message:
         err.message || "Some error occurred while finding most recent items by category matching search criteria."
     });
   else res.send(data);
 });
};
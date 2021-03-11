const sql = require("./db.js");

const SellerReview=function(sellerreview){
    this.name=sellerreview.name;
    this.sellerRating=sellerreview.sellerRating;
    this.sellerReview=sellerreview.sellerReview;
   
}


SellerReview.create = (newSellerReview, result) => {
    sql.query("INSERT INTO reviewSeller SET ?", newSellerReview, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created item review: ", { id: res.insertId, ...newSellerReview});
      result(null, { id: res.insertId, ...newSellerReview });
    });
  };
module.exports = SellerReview;
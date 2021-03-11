const sql = require("./db.js");

const ItemReview=function(itemreview){
    this.shortDescription=itemreview.shortDescription;
    this.itemRating=itemreview.itemRating;
    this.itemReview=itemreview.itemReview;
    this.id_item=itemreview.id_item;
  }


ItemReview.create = (newItemReview, result) => {
    sql.query("INSERT INTO reviewItem SET ?", newItemReview, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created item review: ", { id: res.insertId, ...newItemReview});
      result(null, { id: res.insertId, ...newItemReview });
    });
  };
module.exports = ItemReview;
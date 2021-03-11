const sql = require("./db.js");
const async = require('async');

// what is 'drop' that is in the table def
// and there is no imageUrl in the current table
// will need a sub-category field as well but not
// in table currently
const Item = function(item) {
  console.log('Item this.name: ', item)
  this.id=item.id;
  this.name=item.name;
  this.categoryId=item.categoryId;
  this.subcategoryId=item.subcategoryId;
  this.createdDate=item.createdDate;
  this.drop=item.drop;
  this.price=item.price;
  this.userId=item.userId;
  this.desc=item.desc;
  // this.imageUrl=item.imageUrl;
}

Item.item_list = function(req, result) {   
  console.log('made it to item list model');
  const userSql = `select * FROM Item `;
  sql.query(userSql, function (err, res) {
    if (err) {
      console.log(err.message)
      return
    }
    result(null, res);
  });
}

Item.item_create_post = (newItem, result) => {
console.log('inside item create post ', newItem.body, newItem);

sql.query("INSERT INTO Item SET ?", newItem, (err, res) => {
  if (err) {
    console.log("insert item error: ", err);
    result(err, null);
    return;
  }

  console.log('res: ', res)
  console.log('resid', res.insertId)
  console.log("created item: ", { id: res.insertId, ...newItem});
  result(null, { ...newItem, id: res.insertId });
});
};

module.exports = Item;
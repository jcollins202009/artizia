const sql = require("./db.js");
const async = require('async');

const Subcategory = function(subcategory) {
  console.log('Subcategory this.name: ', subcategory)
  this.name=subcategory.name;
  this.cat_id=subcategory.cat_id;
}

Subcategory.subcategory_list = function(req, result) {   
  console.log('made it to subcategory model');
  const userSql = `select * FROM SubCategory `;
  sql.query(userSql, function (err, res) {
    if (err) {
      console.log(err.message)
      return
    }
    result(null, res);
  });
}

// list all subcategories by id
Subcategory.subcategory_listbyid = function(req, result) {   
  console.log('made it to subcategorybyid model');
  console.log('model subcat_id: ', req.params.id);
  let subcat_id = req.params.id;
  console.log('subcatid: ', subcat_id);

  //const userSql = `select * FROM SubCategory `;
  const userSql = `select * from SubCategory where id = ${subcat_id}`;
  sql.query(userSql, function (err, res) {
    if (err) {
      console.log(err.message)
      return
    }
    result(null, res);
  });
}

// get subcategory with specific id
Subcategory.subcategory_listbycategory = function(req, result) {   
  // console.log('made it to subcategorybycat model');
  // console.log('model catid: ', req.params.catid);
  let category_id = req.params.catid;

  //const userSql = `select * FROM SubCategory `;
  const userSql = `select * from SubCategory where cat_id = ${category_id}`;
  sql.query(userSql, function (err, res) {
    if (err) {
      console.log(err.message)
      return
    }
    result(null, res);
  });
}

Subcategory.subcategory_create_post = (newSubcategory, result) => {
  console.log('inside subcategory create post ', newSubcategory.body, newSubcategory);

  sql.query("INSERT INTO SubCategory SET ?", newSubcategory, (err, res) => {
    if (err) {
      console.log("insert subcategory error: ", err);
      result(err, null);
      return;
    }

    console.log("created subcategory: ", { id: res.insertId, ...newSubcategory});
    result(null, { id: res.insertId, ...newSubcategory });
  });
};

module.exports = Subcategory;
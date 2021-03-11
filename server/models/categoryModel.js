const sql = require("./db.js");
const async = require('async');

const Category = function(category) {
  console.log('Category this.name: ', category)
  this.name=category.name;
}

Category.category_list = function(req, result) {   
  console.log('made it to category model');
  const userSql = `select * FROM Category `;
  sql.query(userSql, function (err, res) {
    if (err) {
      console.log(err.message)
      return
    }
    result(null, res);
  });
}

// list all subcategories by id
Category.category_listbyid = function(req, result) {   
  console.log('made it to categorybyid model');
  console.log('model id: ', req.params.id);
  let category_id = req.params.id;
  console.log('categoryid: ', category_id);

  //const userSql = `select * FROM SubCategory `;
  const userSql = `select * from Category where id = ${category_id}`;
  sql.query(userSql, function (err, res) {
    if (err) {
      console.log(err.message)
      return
    }
    result(null, res);
  });
}

Category.category_create_post = (newCategory, result) => {
  console.log('inside category create post ', newCategory.body, newCategory);

  sql.query("INSERT INTO Category SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("insert category error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.insertId, ...newCategory});
    result(null, { id: res.insertId, ...newCategory });
  });
};

module.exports = Category;

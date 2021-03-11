const sql = require("./db.js");
const async = require('async');

const SigninModel = function(item){

}

SigninModel.findUser=function(searchTerm, results){   
  // console.log(searchTerm) 
    const userSql = `select * FROM users WHERE  email = '${searchTerm}' `;
    sql.query(userSql, function(err, res) {
        if (err) {
          console.log(err.message)

          return
        }
        
        results(null, res)     
        // res.send(result)

    });
}

module.exports=SigninModel;


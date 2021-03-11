const sql = require("./db.js");
const async = require('async');

const AnnouncementModel = function(item){

}

AnnouncementModel.readMessage=function(searchTerm, results){   
 
    const userSql = `select * FROM Announcements ORDER by dateEntered DESC `;
    sql.query(userSql, function(err, res) {
        if (err) {
          console.log(err.message)

          return
        }
        
        results(null, res)     
        // res.send(result)

    });
}

module.exports=AnnouncementModel;
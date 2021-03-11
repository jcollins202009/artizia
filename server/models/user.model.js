const sql = require("./db.js");
const async = require('async');


const UserModel = function (usermodel) {
    this.password = usermodel.password;
    this.email = usermodel.email;
    this.lName = usermodel.lName;
    this.fName = usermodel.fName;
    this.location = usermodel.location;
    this.payment = usermodel.payment;
    this.joined = usermodel.joined
    this.status = usermodel.status
    this.PushTokenNotification=usermodel.PushTokenNotification
}

//Get token notification 
UserModel.findallTokenotification= (result) => {
    console.log("find all notification >>")
    sql.query(`Select PushTokenNotification from users WHERE PushTokenNotification IS NOT NULL`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found token notification: ", res[0]);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};  
module.exports = UserModel;
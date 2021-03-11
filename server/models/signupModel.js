const sql = require("./db.js");


const Signup =function(signup){

    this.password=signup.password;
     this.email=signup.email;
    this.lName=signup.lName;
   this.fName=signup.fName;
   this.PushTokenNotification=signup.PushTokenNotification;
    this.location=signup.location;
   this.payment=signup.payment;
   this.joined=signup.joined
   this.status=signup.status

}


Signup.create = (newSignup, result) => {
    sql.query("INSERT INTO users SET ?", newSignup, (err, res) => {
      console.log(sql);
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newSignup});
      result(null, { id: res.insertId, ...newSignup });
    });
  };
module.exports = Signup ;
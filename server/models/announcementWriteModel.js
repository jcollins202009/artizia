const sql = require("./db.js");


const Announcement =function(announcement ){

    this.title=announcement.title;
     this.message=announcement.message;
    this.dateEntered=announcement.dateEntered;
   this.expiredDate=announcement.expiredDate;


}


 Announcement.create = (newAnnouncement, result) => {
    sql.query("INSERT INTO Announcements SET ?", newAnnouncement, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created announcement: ", { id: res.insertId, ...newAnnouncement});
      result(null, { id: res.insertId, ...newAnnouncement });
    });
  };
module.exports = Announcement ;
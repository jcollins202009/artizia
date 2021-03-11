module.exports = app => {
    const user = require("../controllers/user.controller");
// Get token notificacion expo
app.get("/api/tokennotification",user.findallTokenotification);
}; 
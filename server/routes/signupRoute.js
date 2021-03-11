module.exports = app => {
    const signup = require("../controllers/signupController");
// Create a new User
app.post("/signup", signup.create);
}; 
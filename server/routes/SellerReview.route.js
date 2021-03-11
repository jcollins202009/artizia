module.exports = app => {
    const sellerreview = require("../controllers/sellerreview.controller.js");
// Create a new Customer
app.post("/api/newsellerreview", sellerreview.create);
}; 
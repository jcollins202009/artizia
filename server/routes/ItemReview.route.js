module.exports = app => {
    const itemreview = require("../controllers/itemreview.controller.js");
// Create a new Customer
app.post("/api/newitemreview", itemreview.create);
}; 
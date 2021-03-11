module.exports = app => {
    const signin = require("../controllers/signinContoller");
// Find User
app.post("/signin", signin.findUser);
}; 

// module.exports = app => {
//     const item = require("../controllers/item.controller.js");

//     // Find categories that match search term
//     app.get("/api/mostRecentItemsByCategoryMatchingSearchTerm/:searchTerm/:numberOfMostRecentItems", item.findMostRecentItemsByCategoryMatchingSearchTerm);
// }; 
const requireAuth = require('../middleware/requireAuthRoute')
module.exports = app => {
    const item = require("../controllers/item.controller.js");
    // Find items that match search term
    app.get("/api/mostRecentItemsByCategoryMatchingSearchTerm/:searchTerm/:numberOfMostRecentItems", item.findMostRecentItemsByCategoryMatchingSearchTerm);
    // Find items that match search criteria
    app.get("/api/mostRecentItemsByCategoryMatchingSearchCriteria/:searchTerm/:categoryId/:numberOfMostRecentItems", item.findMostRecentItemsByCategoryMatchingSearchCriteria);
    // Delete My item
    app.delete("/api/deletemyitem/:userid/:itemid",item.deleteMyitem);
    //Find user item
    app.get("/api/myitem",requireAuth,item.findUserItem);
}; 
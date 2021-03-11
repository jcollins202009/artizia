const fs = require('fs');
const path = require('path');
const multer  = require('multer');

multer.diskStorage({});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads/')
//     },
//     filename: function(req, file, cb){
//         cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//     }
// });
   
// const upload = multer({ storage: storage })
const upload = multer();

module.exports = app => {
    const image = require("../controllers/image.controller.js");

    // Upload image to item
    app.post("/api/uploadimage/:itemid", upload.single('fileData'), image.uploadImageToItem);
}; 
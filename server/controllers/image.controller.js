const ImageModel= require("../models/image.model.js");

exports.uploadImageToItem = (req, res) => {

    // Validate request
    if (!req.body) {

    res.status(400).send({
        message: "Content can not be empty"
    });
    }

    ImageModel.uploadImageToItem(req, (err, data) => {

        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Item with id ${req.params.itemid} not found`
            });
        } else {
            res.status(500).send({
            message: "Could not upload image for item with id " + req.params.itemid
            });
        }
        } 
        else res.send({ message: `Image uploaded to item successfully!` });    
    });
};
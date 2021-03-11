const express = require('express');
const router = express.Router();
const db = require("../models/db");

router.get('/:id', (req, res)=>{
    // Get date for Item Detail Screen
    let sql = `SELECT Image.*, Item.* from Item INNER JOIN Image ON  Image.itemId = Item.id  WHERE Image.itemId = ${req.params.id}  `
    let query = db.query(sql, (err, result)=>{
        if (err){
            res.status(404).send({error:err})
        }
       
        res.send(result)
    })
})

module.exports = router
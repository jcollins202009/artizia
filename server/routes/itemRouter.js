const express = require('express');
const router = express.Router();
const item_controller = require('../controllers/addItemController');
const db = require('../models/db');
const auth = require('../middleware/requireAuthRoute')

router.get('/', item_controller.item_list);

router.post('/create', item_controller.item_create);

// router.get('/:id', (req, res)=>{
   
//     let sql = `SELECT *  FROM Announcements  WHERE idAnnouncements = ${req.params.id}  `
//     let query = db.query(sql, (err, result)=>{
//         if (err){
//             res.status(404).send({error:err})
//         }
       
//         res.send(result)
//     })
// })

// router.post('/:id', (req, res)=>{
//     // console.log(req.params, req.body)
//     let sql = `UPDATE Announcements  SET message = '${req.body.message}' WHERE idAnnouncements = ${req.params.id}  `
//     let query = db.query(sql, (err, result)=>{
//         if (err){
//             res.status(404).send({error:err})
//         }
       
//         res.send('post updated')
//     })
// })

// router.delete('/:id', (req, res)=>{
//     // console.log(req.params)
//     let sql = `DELETE FROM Announcements WHERE idAnnouncements = ${req.params.id} `
//     let query = db.query(sql, (err, result)=>{
//         if (err){
//             console.log({error:err})
//         }
//         console.log(result)
//         res.send('post deleted')
//     })
// })

module.exports = router
const db = require("../models/db");
const jwt = require('jsonwebtoken')
const dbConfig = require("../config/db.config.js");


module.exports = (req, res, next)=>{
    const {authorization} = req.headers
    
    if(!authorization) {
        return res.status(401).send({error: 'You must be logged in'})
    }
    const token = authorization.replace('Bearer ', '' )
    jwt.verify(token, dbConfig.jwt, async (err, payload)=>{
        if(err){
            return res.status(401).send({error: 'You must be logged in'})
        }
        const {userId} = payload

        const userSql = `select * FROM users WHERE  idusers = ${userId} `;
       await db.query(userSql, function(err, result) {
            if (err) {
              console.log(err.message)
    
             }
           const userProfile = result[0]
            delete userProfile.password
        req.user = userProfile

        next()
    
        }) 

        
    })

}


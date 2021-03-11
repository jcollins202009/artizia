module.exports={
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    port:process.env.DBPORT,
 // pool: {
   // max: 5,
  //  min: 0,
    //acquire: 30000,
    //idle: 10000
 // },
  jwt:process.env.JWT
}
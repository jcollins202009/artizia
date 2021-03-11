const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLDNAME, 
    api_key: process.env.CLDAPIKEY, 
    api_secret: process.env.CLDAPISECRET     
  });

module.exports = cloudinary;



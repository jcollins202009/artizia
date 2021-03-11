const sql = require("./db.js");
const cloudinary = require('./cloudinary.js');
const streamifier = require('streamifier');
const { image } = require("./cloudinary.js");

const ImageModel=function(imageModel){
    this.createdDate=imagemodel.createdDate;
    this.imageUrl=imagemodel.imageUrl;
    this.itemId=imageModel.itemId;
}

ImageModel.uploadImageToItem = (req, result) => {

    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {

            let stream = cloudinary.uploader.upload_stream(
              (err, res) => {
                if (res) {            
                  resolve(res);
                } else {
                  reject(err);
                }
              }
            );
    
           streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
    
    async function upload(req) {
        let result = await streamUpload(req);
        return result;
    }
    
    upload(req)
    .then((imageResult) => {

        let dateTimeNow = new Date();
        dateTimeNow = dateTimeNow.getUTCFullYear() + '-' +
            ('00' + (dateTimeNow.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + dateTimeNow.getUTCDate()).slice(-2) + ' ' + 
            ('00' + dateTimeNow.getUTCHours()).slice(-2) + ':' + 
            ('00' + dateTimeNow.getUTCMinutes()).slice(-2) + ':' + 
            ('00' + dateTimeNow.getUTCSeconds()).slice(-2) + '.' +
            ('000' + dateTimeNow.getUTCMilliseconds()).slice(-3);

        console.log(dateTimeNow);
        const newImage = {
            createdDate: dateTimeNow,
            url: imageResult.url,
            itemId: req.params.itemid,
        };

        sql.query("INSERT INTO Image SET ?", newImage, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
        
            console.log("created image: ", { id: res.insertId, ...newImage });
            result(null, { id: res.insertId, ...newImage });           
        })
    })
    .catch(err => {
        result(err, null);
    })
};

module.exports = ImageModel;
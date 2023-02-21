const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require('dotenv');
aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "amazon-clone-ver1",
        metadata: (req, file, cb)=> {
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
});
module.exports = upload;













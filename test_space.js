var express = require('express'),
    aws = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    accessKeyId: "NMMJMYHCCUBWHD4P32I2", // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: '5/GPR8vate39N+yUSlQmdZ5QGN2EC02jQVDO1O3H8tI',
    region: 'sgp1'
});
const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');

var app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'empower-static',
        acl: 'public-read',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        },
    }),
}).single('upload');

//open in browser to see upload form
app.post('/', function (req, res) {
    console.log(req.files);
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.status(400).json({ errors: err });
        }

        return res.status(200).json({ message: 'File uploaded successfully.' });
    });
});

app.listen(9002, () => {
    console.log(`Service started, listening to port`);
})
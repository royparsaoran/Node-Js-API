const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const userHandler = require('../modules/v1/users/handlers/api_handler');
const authHandler = require('../modules/v1/auth/handlers/api_handler');

const app = express()
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));

app.get('/', (req, res) => { return res.send({ message: 'Service is running properly' }) });

app.post('/v1/auth/login', authHandler.login);
app.post('/v1/auth/register', authHandler.register);

app.get('/v1/users', userHandler.get);
app.get('/v1/users/:id', userHandler.findById);
app.post('/v1/users', userHandler.insert);
app.put('/v1/users/:id', userHandler.update);

app.all('*', (req, res) => { return res.status(404).json({ success: false, message: 'Route not found' }) })

module.exports = { app }
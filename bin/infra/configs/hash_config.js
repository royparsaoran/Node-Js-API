require('dotenv').config();
const confidence = require('confidence');

const config = {
    crypto: {
        algorithm: 'aes-256-ctr',
        secretKey: 'Hello_GB!!!!'
    }

};

const store = new confidence.Store(config);

exports.get = key => store.get(key);

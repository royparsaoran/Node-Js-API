require('dotenv').config();
const confidence = require('confidence');

const config = {
    app: {
        env: process.env.APP_ENV || 'development'
    },
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    port: process.env.PORT,
    basicAuthApi: [
        {
            username: process.env.BASIC_AUTH_USERNAME,
            password: process.env.BASIC_AUTH_PASSWORD
        }
    ],
    mysqlConfig: {
        port: parseInt(process.env.MYSQL_PORT) || 3306,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);

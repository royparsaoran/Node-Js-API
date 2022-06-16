const { Sequelize } = require('sequelize');
const config = require('../../../infra/configs/global_config');
const mysqlConfig = config.get('/mysqlConfig');

const db = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql',
    query :  {
        raw: true
    },
    logging: false
});

module.exports = {
    db
}
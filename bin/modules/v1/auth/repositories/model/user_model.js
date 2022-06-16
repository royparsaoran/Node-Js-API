const { Sequelize } = require('sequelize');
const {db} = require('../../../../../helpers/databases/mysql/sequelize');

const { DataTypes } = Sequelize;

const User = db.define('user', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

module.exports = User;
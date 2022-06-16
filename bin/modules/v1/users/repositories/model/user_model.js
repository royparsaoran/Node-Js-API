const { Sequelize } = require('sequelize');
const {db} = require('../../../../../helpers/databases/mysql/sequelize');

const { DataTypes } = Sequelize;

const User = db.define('user', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER },
    phone: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    postal_code: { type: DataTypes.STRING },
    company_number: { type: DataTypes.STRING },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

module.exports = User;
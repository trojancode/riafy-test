const Sequelize = require('sequelize');
const db = require('./index');
var uuidv1 = require('uuidv1');
const { encryptPassword } = require('../handlers/passwordEncrypt');
const User = db.define('usr', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
    },

});


User.beforeCreate(function (user, options) {
    user.salt = uuidv1();
    let _hashPassword = encryptPassword(user.salt, user.password);
    user.password = _hashPassword;
});


User.sync().then(() => {
    console.log('Users synced');
});
module.exports = User;

const User = require('../models/user');
const jwt = require('jsonwebtoken');//for generating signed token
const expressJwt = require('express-jwt');//for authentication check
const { encryptPassword } = require('../handlers/passwordEncrypt');
exports.signup = async (req, res) => {

    let { username, password, } = req.body;
    if (!password || !username) {
        return res.status(400).json({
            error: "All fields are required"
        })
    }
    username = username.toLowerCase();
    let userData = await User.create({
        username: username,
        password: password,
    }).catch((error) => {
        if (error.errors[0].path == "username") {
            return res.status(400).json({
                error: "User already exist, please login",
            });
        }
        return res.status(400).json({
            error: error.errors[0].message,
        });

    });
    userData.password = null;
    userData.salt = null;

    var token = jwt.sign({ id: userData.id }, process.env.ACESS_TOKEN_SECRET)

    return res.json({
        token: token,
        user: userData
    });
}

exports.signin = async (req, res) => {

    let { username, password } = req.body;
    username = username.toLowerCase();

    const userData = await User.findOne({
        where: { username: username }
    }).then(async data => {

        if (!data) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        if (!this.authenticate(data, password)) {
            return res.status(401).json({
                error: "Wrong password or email"
            });
        }

        const token = jwt.sign({ id: data.id }, process.env.ACESS_TOKEN_SECRET)

        data.password = undefined;
        data.salt = undefined;

        return res.json({
            token,
            user: data
        });
    }).catch((error) => {
        return res.status(400).json({
            error: error['message']
        });
    });
}

exports.authenticate = (user, password) => {
    const hash = encryptPassword(user.salt, password)
    if (user.password == hash) {
        return true;
    }
    return false;
}



exports.signout = (req, res) => {
    res.json({ message: "Signout Success" })
};
exports.requireSignin = expressJwt({
    secret: process.env.ACESS_TOKEN_SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
});

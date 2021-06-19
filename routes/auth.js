const express = require('express');
const router = express.Router();

const {
    signup,
    signin,
} = require('../controller/auth');


const {userSignupValidator} = require('../handlers/validators');
router.post('/signup',userSignupValidator, signup);
router.post('/signin', signin);

module.exports = router;
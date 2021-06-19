exports.userSignupValidator = (req, res, next) => {
    req.check('username', 'Username is required').notEmpty()
    req.check('password', 'Password is required').notEmpty()
    // req.check('password')
    //     .isLength({ min: 8 })
    //     .withMessage('Password must contain 8 character')
    //     .matches(/[A-Z]/)
    //     .withMessage("Password must contain an uppercase letter")
    //     .matches(/[a-z]/)
    //     .withMessage("Password must contain an lowercase letter")
    //     .matches(/\d/)
    //     .withMessage("Password must contain a number")
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            error: errors[0].msg,
            msg:"validation",
            errors:errors
        });
    }

    next();

}


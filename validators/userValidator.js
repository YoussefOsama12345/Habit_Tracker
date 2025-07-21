/**
 * @file userValidator
 * @description This file contains middleware functions for validating user input
 * in registration and login requests using express-validator.
 * It exports validation arrays and a middleware function to handle errors.
 */

const {check , validationResult } = require("express-validator");
const ERROR_MESSAGES = require("../constants/errorMessages")

/**
 * * Validation rules for user registration.
 * Ensures that name, email, and password are provided and properly formatted.
 */

const registerValidator = [
    check("name")
        .notEmpty().withMessage(ERROR_MESSAGES.NAME_REQUIRED)
        .isLength({min : 3}).withMessage(ERROR_MESSAGES.NAME_MIN),
    
    check("email")
        .notEmpty().withMessage(ERROR_MESSAGES.EMAIL_REQUIRED)
        .isEmail().withMessage(ERROR_MESSAGES.EMAIL_INVALID),
    
    check("password")
        .notEmpty().withMessage(ERROR_MESSAGES.PASSWORD_REQUIRED)
        .isLength({min : 6}).withMessage(ERROR_MESSAGES.PASSWORD_MIN),
]   

/**
 * Validation rules for user login.
 * Ensures that email and password are provided and the email is valid.
 */

const loginValidator = [
    check("email")
        .notEmpty().withMessage(ERROR_MESSAGES.EMAIL_REQUIRED)
        .isEmail().withMessage(ERROR_MESSAGES.EMAIL_INVALID),

    check("password")
        .notEmpty().withMessage(ERROR_MESSAGES.PASSWORD_REQUIRED)
]

/**
 * Middleware to check for validation errors.
 * if there are any errors from validator rules, returns a 400 response with the errors.
 * Otherwise, proceeds to the next middleware / controller
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next()
}

module.exports = {
    registerValidator,
    loginValidator,
    validate
}


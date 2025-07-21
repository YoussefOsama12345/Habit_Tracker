
/**
 * @file user.model.js
 * @description Defines the Mongoose User Schema and related methods.
 * This schema includes username, email, password, hashed password , and timestamps
 * It also includes pre-save middleware to hash passwords and a method to verify them 
 */


const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const zxcvbn = require("zxcvbn");


/**
 * User Schema
 * @typedef {Object} User
 * @property {string} username - Unique username of the user.
 * @property {string} email - Unique email of the user.
 * @property {string} password - Hashed password of the user.
 * @property {Date} createdAt - Timestamp when the user was created.
 * @property {Date} updatedAt - Timestamp when the user was last updated.
 */


const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : [true, "Username is required"],
            unique : true,
            trim : true,
            minlength : [3, "Username must be at least 3 characters"],
            maxlength : [20, "Username mustt not exceed 20 characters"],
            match: [/^[a-zA-Z0-9]+$/, "Username can only contain at least one uppercase letter, one lowercase letter, one number, and one special character"],
        },

        email : {
            type : String,
            required : [true , "Email is required"],
            unique : true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/,"Please enter a valid email address"]
        },

        password : {
            type : String,
            required : [true, "Password is required"],
            minlength : [8, "Password must be at least 8 characters long"],
            maxlength : [25, "Password must not exceed 25 characters"],
            validate: {
                validator: function (value){
                    // strong password regex: at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
                },
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
            }
        },

        // cofirmPassword is not stored in the DB

        confirmpassword : {
            type : String,
            required : [true , "Please confirm your password"],
            validate: {
                validator: function(value){
                    return value === this.password
                },
                message:
                    "Passwords do not match"
            }
        }
    },
    {
        timestamps : true
    }
)

/**
 * Pre-save hook to hash the user's passoword before saving it to the database
 * It only hashes the password if it has been modified
 * 
 * @function 
 * @name pre-save
 * @memberof User
 * @param {Function} next - Callback function to processed to the next middleware
 */


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }

    const passwordStrength = zxcvbn(this.password);
    if (passwordStrength.score < 3) {
        return next(new Error("Password is too weak. Try using uppercase, lowercase, numbers, and symbols."));
    }

    this.password = await bcrypt.hash(this.password,10);
    next()
});


/**
 * Compare an  entered password with the user's hashed password
 * 
 * @function matchPassword
 * @memberof User
 * @param {string} enteredPassword - The Plain text password entered by the user.
 * @returns {Promise<boolean>} - True if the password matches , otherwise false
 * @example 
 * const isMatch = await user.matchPassword('123456');
 */

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}


/**
 * Mongoose model for the User schema.
 * @type {mongoose.Model<User>}
 */

module.exports = mongoose.model("User",userSchema)

const dotenv = require("dotenv")

dotenv.config()



module.exports = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    EMAIL_USER : process.env.EMAIL_USER,
    EMAIL_PASS : process.env.EMAIL_PASS,
}


const mongoose = require("mongoose")
const {MONGO_URI} = require("./env")

const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("MongoDB Connected")
    }
    catch(err){
        console.log("MongoDB Connection Failed : " + err.message)
        process.exit(1);
    }
};

module.exports = connectDB;
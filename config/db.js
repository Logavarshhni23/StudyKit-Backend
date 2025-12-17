//npm i mongoose
const mongoose = require("mongoose")

async function connectDB() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
        console.log("MongoDB connected ✅");
    }
    catch(err){
        console.log("MongoDB connection error ❌",err.message);
        process.exit(1);  //stops node server if connection fails
    }

}
module.exports = connectDB;
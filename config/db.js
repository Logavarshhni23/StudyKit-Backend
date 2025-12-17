//npm i mongoose
const mongoose = require("mongoose")

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected ✅");
        console.log("Connected DB:", mongoose.connection.name);
    }
    catch(err){
        console.log("MongoDB connection error ❌",err.message);
        process.exit(1);  //stops node server if connection fails
    }

}
module.exports = connectDB;
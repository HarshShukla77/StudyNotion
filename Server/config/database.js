const mongoose = require('mongoose');
require("dotenv").config();
const colors = require("colors")
exports.connect =()=>{
    mongoose.connect(process.env.MONGODB_URL,{
    })
    .then(()=> console.log("Database is Connected Successfuly".blue.red.underline.bold))
    .catch((err)=> {
        console.log("Db connected failed");
        console.log(err);
        process.exit(1);
    })
}
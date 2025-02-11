const mongoose = require('mongoose');
require("dotenv").config();

exports.connect =()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(()=> console.log("Database is Connected Successfuly"))
    .catch((err)=> {
        console.log("Db connected failed");
        console.log(err);
        process.exit(1);
    })
}
//here connecting mongodb database
const mongoose = require('mongoose');//imported dependy of mongoose

const connectDB = async ()=>{
    try{

        mongoose.connect(process.env.MONGO_URI, {
        //we can keep empty here bcs now it is taking by default all.
        });
        console.log('MongoDB connected successfully');
    }catch(error){
        console.log('Error while connecting to MongoDb: ', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
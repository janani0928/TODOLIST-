const mongoose = require('mongoose')

function RunServer(){
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is connected!")
    }catch(error){
        console.error(error.message);
    }
}

module.exports=RunServer;


// 2GELduDAGjKQCJqV
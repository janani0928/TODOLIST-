const mongoose = require('mongoose')

function RunServer(){
    try{
        mongoose.connect('mongodb+srv://jananim2809_db_user:2GELduDAGjKQCJqV@cluster0.o9r3oac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("MongoDB is connected!")
    }catch(error){
        console.error(error.message);
    }
}

module.exports=RunServer;


// 2GELduDAGjKQCJqV
require('dotenv').config();
const express= require('express'); 
const RunServer = require('./Database/connection');
const todoRouter = require('./routes/todoRoutes');
const cors =require('cors')

// const cors=require('cors')


const app= express(); 
const PORT=process.env.PORT; 

// json : javascript object notation
// used to transfer the file
app.use(express.json());
app.use(cors())

RunServer()



app.use('/todolist',todoRouter)

app.listen(PORT,()=> {
console.log(`server is running on http://localhost:${PORT}`)
})












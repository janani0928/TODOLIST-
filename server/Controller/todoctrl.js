const Todo = require("../model/todo");

const createToDo =async(req,res)=>{
    const{message}=req.body;

    if(req.body.message===""){
        return res.status(401).josn({errorMessage:"message cannot be empty"})
    }

    // Validation: check if message is empty or dose not meet the length requirements

    if(message.length<4 || message.length>20){
        return res
        .status(400)
        .json({errorMessage:"message must be between 4 and 20 charecter."});
    }
    try{
        const addToDo =await Todo.create({message});
        res.status(200).json({success:"created",data:addToDo});
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Interval server eroor"})
    }
};

const getAllToDo= async(req,res)=>{
    try{
        const getToDo=await Todo.find({});
        res.status(200).json({data:getToDo});

    }catch(error){
        console.log(error);
    }
};

// when you see in empty {} object passed to the .find() method, it means that the funtion is requsting all the documents from the collection.

const deleteToDo= async(req,res)=>{
    try{
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({success:"deleted",data: deleted});
    }catch(error){
        console.log(error);
    }
}
// findByIdAndDelete(): this is a mongoose method that perfroms two actions in one step:
// find a document by its _id field.
// delete the document from the collection.

// req.params.id refers to the ID  of the ToDo item that you want to delete ,which is passed in the URL.for example, if the routes is/delete/:id,req.params.id will contain the value of thet id.

// a client make a request to an endpoint like:
// DELETE/todo/13345abscdef
// where 13345abscdef is the ID of the ToDo item to be deleted.

// Routes Handler:
// the ID(13345abscdef) goto assigned to

const updatedTodo =async(req,res)=>{
    try{

const updatedTodo= await Todo.findByIdAndUpdate(
    req.params.id,
    {
        message:req.body.message,
    },
    {new:true}
);
if(updatedTodo){
    res.json({success:"updated",data:updatedTodo});
}else{
    res.status(404).json({error:"ToDo not found"});
}
}catch(error){
    res.status(400).json({error:error.Message})
}
};
// {new :true}: this option tells mongoose to retrun the updated documents instead of the old one. without{new:true},mongoose would retrun the document as it was before the update.
// this ensures that the newly updated varsion of the document is retruned

module.exports={
    createToDo, //if you want to export all the functions.then you have to use brackets
    getAllToDo,
    updatedTodo,
    deleteToDo
};
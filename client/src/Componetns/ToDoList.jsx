import { AiFillDelete } from "react-icons/ai"; 
import { AiFillEdit } from "react-icons/ai"; 
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";

const ToDoList = () => {
    const[todos,setTodos]=useState([])
    const[isEditting,setIsEditting]=useState(false)
    const[currentTodo,setCurrentTodo]=useState({_id:null, message:''})

    const getAllTodos = async ()=>{
        try{
            const response= await axios.get('https://todolist-backend-bvi3.onrender.com/todolist/getall');
            setTodos(response.data.data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        getAllTodos();
    },[])

// the useeffect hook is an essanental part of the react component . it is used yo perfrom side effect in functional components such as feching data ,subcribing to events or manually updating the DOM

// in this component the useEffgect is used to fecth the inital list of to-dos from the backend when the component is first renderd

const handleDelete= async (id)=>{
    try{
        const result=await axios.delete(`https://todolist-backend-bvi3.onrender.com/todolist/deleteToDo/${id}`);
        if(result.data.success==='deleted'){
            toast.success("todo deleted successfuly!");
            getAllTodos();   
        }
    }catch(error){
        console.log(error);
        toast.error("failed to delete todo");
    }
};
const handleEditInputChange=(e)=>{
    setCurrentTodo({...currentTodo, message: e.target.value});
};

// {...currentTodo} means "create new object and copy all properties of currentTodo into it."
// Exaple workFlow
// initial satate:
// is editting = false
// currentTodo = {_id:null,message:''}
// the user not is editingmany to-do yet.

const handleEdit=(todo)=>{
    setIsEditting(true);
    setCurrentTodo({_id: todo._id, message: todo.message});
};
const handleUpdate=async()=>{
    // validation the message before updating
    if(currentTodo.message.length < 4 || currentTodo.message.length > 20){
        toast.error("message must be between 4 and 20 charecter");
        return; //block the update if all validation fail
    }
    try{
        const result= await axios.put(`https://todolist-backend-bvi3.onrender.com/todolist/updateToDo/${currentTodo._id}`,{
            message: currentTodo.message
        }); 
        if(result.data.success==='updated'){
            toast.success('ToDo update successfuly!');
            console.log(result)
            getAllTodos();
            setIsEditting(false);
            setCurrentTodo({_id:null, message:''});
        }
    }catch(error){
        console.log(error);
        toast.error("failed to update ToDo");
    }
};
 
const handleCancelEdit = ()=>{
    setIsEditting();
    setCurrentTodo({_id:null,message:''})
};


  return (
    <div>
        {isEditting ?(
            <div>
                <input type="text" 
                value={currentTodo.message}
                onChange={handleEditInputChange}/>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
                </div>
        ):(
            <ul>
                {todos.map((todo)=>(
                    <li key={todo._id}>
                        {todo.message}
                        <AiFillEdit className='icon'onClick={()=>handleEdit(todo)}/> 
                            <AiFillDelete  className='icon' onClick={()=>handleDelete(todo._id)}/>  
                    </li>
                ))}
            </ul>
        )}
      
    </div>
  );
};

export default ToDoList;

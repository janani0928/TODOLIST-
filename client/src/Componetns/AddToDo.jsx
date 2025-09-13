import React, { useState } from 'react'
import axios from 'axios';
import './AddToDo.css';
import { toast } from 'react-toastify';


const AddToDo = () => {
const[message,setMessage]=useState(' ');
    const createToDo =async ()=>{
        // validation message
        if(message===''){
            toast.error('cannot add the empty message')
            return;
        }

        if(message.length<4||message.length>20){
            toast.error('message must be between 4 and 20 character')
            return;
        }
        try{
            const response = await axios.post('http://localhost:3000/todolist/',{
                message:message,
            });
            if(response.data.success ==='created'){
                window.location.reload();
            }
        }catch(error){
            console.log(error);
        }
    };

    
  return (
    <div >
    <div className='container'>
        {/* input for message */}
        <input type="text" 
        placeholder='add Task here'
        onChange={(e)=>setMessage(e.target.value)}/>
        {/* add button */}
        <button onClick={createToDo} className='btn'>ADD</button>   
    </div>
    </div>
  )
}

export default AddToDo

import React from 'react'
import './App.css'
import Header from './Componetns/Header'
import AddToDo from './Componetns/AddToDo'
import ToDoList from './Componetns/ToDoList'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'



const App = () => {
  return (
    <div>
      <Header/>
      <AddToDo/>
      <ToDoList/>
      <ToastContainer/>
    </div>
  )
}

export default App

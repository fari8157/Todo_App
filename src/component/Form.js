import React,{useEffect} from 'react'
import {v4 as uuidV4} from "uuid";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Form({input,setInput,todos,setTodos,editTodo,setEditTodo}) {
    const onInputChange=(event)=>{
        setInput(event.target.value);
    }
    // const onFormSubmit=(event)=>{
    //     event.preventDefault();
    //     if(!editTodo){
    //         setTodos([...todos,{id:uuidV4(),title:input,completed:false}]);
    //     setInput("");
    //     }else{
    //         updateTodo(input,editTodo.id,editTodo.completed)
    //     }
       
    // }
    const onFormSubmit = (event) => {
        event.preventDefault();
        const trimmedInput = input.trim();
       if (!editTodo) {
         if (trimmedInput !== "") {
            setTodos([...todos, { id: uuidV4(), title: trimmedInput, completed: false }]);
            setInput("");
          } else {
            toast.error('Please enter a valid todo!', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000, 
            });
          }
        } else {
          updateTodo(trimmedInput, editTodo.id, editTodo.completed);
        }
      };
      
    const updateTodo=(title,id,completed)=>{
        const newTodo=todos.map((todo)=>todo.id===id?{title,id,completed} : todo );
        setTodos(newTodo);
        setEditTodo("");
        toast.success('Edit successful!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000, 
          });
    }
    useEffect(()=>{
        if(editTodo){
            setInput(editTodo.title);
        }else{
            setInput("")
        }
    },[setInput,editTodo])
  return (
   <form onSubmit={onFormSubmit}>
    <input type="text" placeholder='enter a todo' className='task-input' value={input} required onChange={onInputChange} />
    <button className='button-add' type='submit'> {editTodo ? "ok" : "ADD"}</button>
   </form>
  )
}

export default Form

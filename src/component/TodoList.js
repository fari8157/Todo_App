import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TodoList({todos,setTodos,setEditTodo}) {
    // const handleDelete=({id})=>{
    //     setTodos(todos.filter((todo)=>todo.id!==id));
    // }
    const handleDelete = ({ id }) => {
        const deletedTodo = todos.find((todo) => todo.id === id);
        setTodos(todos.filter((todo) => todo.id !== id));
        toast.error(`Task "${deletedTodo.title}" deleted`);
    };
    
    // const handleComplete=(todo)=>{
    //     setTodos(
    //         todos.map((item)=>{
    //             if(item.id === todo.id){
    //                 return{...item,completed:!item.completed};
    //             }
    //             return item;
    //         })
    //     )
    // }
    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if (item.id === todo.id) {
                   const updatedItem = { ...item, completed: !item.completed };
                    toast.success(`Task "${updatedItem.title}" marked as ${updatedItem.completed ? 'completed' : 'incomplete'}`);
                    return updatedItem;
                }
                return item;
            })
        );
    };
    const handleEdit=({id})=>{
        const findTodo= todos.find((todo)=>todo.id===id);
        setEditTodo(findTodo)
        
    }
  return (
    <div>
         <ToastContainer />
     {todos.map((todo)=>(
        <li className='list-item' key={todo.id}>
            <input type="text" value={todo.title} className={`list ${todo.completed ? "complete ": ""}`} onChange={(event)=>
                event.preventDefault()
             } />
             <div>
                <button className='button-complete task-button' onClick={()=>handleComplete(todo)}>
                    <i className="fa fa-check-circle"></i>
                </button>
                <button className='button-edit task-button' onClick={()=>handleEdit(todo)}>
                    <i className="fa fa-edit"></i>
                </button>
                <button className='button-delete task-button' onClick={()=>{
                    handleDelete(todo)
                }}>
                    <i className="fa fa-trash"></i>
                </button>
             </div>
        </li>
     ))}
    </div>
  );
};

export default TodoList

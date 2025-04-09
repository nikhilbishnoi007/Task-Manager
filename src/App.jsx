import { useState,useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [chekeditem, setchekeditem] = useState({})
  const [showfinish, setshowfinish] = useState(false)
  const save=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  useEffect(() => {
    let todosstring=localStorage.getItem("todos")
    if(todosstring){

      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  
  const toglefinish=(e) => {
    setshowfinish(!showfinish)
  }
  
  const handlechange=(e)=>{
    settodo(e.target.value)
  }
   const handleedit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos)
    save()
  }
  const hadnledelete=(e,id)=>{
    const result= confirm("are you sure you  want to delete this task")
    if(result){
      let newtodos=todos.filter(item=>{
        return item.id!==id
      });
      settodos(newtodos)
      toast.success("todo delet sucesfully")
    }
    else{
      alert("delete cancel")
    }
    save()

  }

  const handleadd=()=>{
   settodos([...todos,{ id:uuidv4(), todo, isCompleted:false}])
   settodo("")

  }
  const handlecheck=(id)=>{
   setchekeditem((prev)=>({
    ...prev,
    [id]:!prev[id],
   }))
   save()
  }
  return (
    <>

      <Navbar/>
      <section id='home'>
      <div className="box">
      <div className="container">
        <div className="heading">
          <h1>iTask-Manage your all task  at one place</h1>
        </div>
        <div className="addtodo">
          <h2>Add your task</h2>
          <div className="addtask">
          <input type="text" onChange={handlechange} value={todo} />
          <button className='btn' onClick={handleadd} disabled={todo.length<=3}>Add</button>
          </div>
        </div>

        <div className="task"><h2>Your Task</h2></div>
        <div className="finish">
          <input type="checkbox" name="checkbox" id="checkbox" checked={showfinish} onChange={toglefinish} />
          Show finish Task
        </div>
        <div className="todos">
          {todos.length===0 && <div className='notask'> No Task to dispaly </div>}
          {todos.map(item=>{

         
          return (showfinish||!chekeditem[item.id]) &&<div key={item.id} className="todo">
            <div className="checkbox">
            <input  type="checkbox"  name={item.id} id="checkbox" checked={!!chekeditem[item.id]} onChange={()=>{handlecheck(item.id)}}/>
            <div className={`text ${chekeditem[item.id]? "striked" : " "}`}>{item.todo}</div></div>
            <div className="buttons">
              <button className='btn' onClick={(e)=>{handleedit(e,item.id)}} ><MdEdit /></button>
              <button className='btn' onClick={(e)=>{hadnledelete(e,item.id);}}><MdDelete /></button>
            </div>
          </div>
           })}
        </div>
      </div>
      </div>
      </section>
      <Toaster />
    </>
  )
}

export default App

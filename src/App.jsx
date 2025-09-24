import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])



  const saveToLocal = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLocal()

  }
  const handleEdit = (e, id) => {
    let task = todos.filter(i => i.id === id)
    setTodo(task[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLocal()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLocal()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLocal()
  }





  return (
    <>
      <Navbar />
      <div className='flex justify-center m-[5%]'>
        <div className='flex flex-col w-[100%] h-3/12 bg-[#ede9fe] rounded-2xl p-3 md:w-1/2'>
          <div className='flex font-bold text-4xl mb-3 justify-center items-center'>Add a Todo</div>
          <div className='flex gap-2 flex-col items-center justify-center'>
            <input onChange={handleChange} value={todo} className='border-2 rounded-[50px] w-full h-10 pl-2' type="text" placeholder='Enter Task Here!'/>
            <button onClick={handleAdd} disabled={todo.length <= 3} className='flex border-1 bg-[#322f82]  text-white w-20 h-10 rounded-[5px] font-bold justify-center items-center p-1 hover:bg-[#310cd8] hover:scale-110'>Save</button></div>
          <div className='mt-3 mb-3 mr-3'>
            <input onChange={toggleFinished} type="checkbox" className='hover:scale-120' checked={showFinished} /> Show Finished
            <div className=' flex justify-center items-center opacity-20 h-[1px] bg-black w-full my-2'></div>
            <div className='font-bold text-xl mt-3 mb-3'>Your Tasks</div>
            <div className="list flex gap-5 w-full">
              <ul className='list flex flex-col gap-5 w-full'>
                {todos.length === 0 && <div className='font-bold text-xl mt-3 mb-3'>No Task Available</div>}
                {todos.map(item => {
                  return (showFinished || !item.isCompleted) &&
                    <li key={item.id} className='flex gap-5 items-center justify-between w-full'>
                      <div className='flex gap-5 w-fit '><input onChange={handleCheckbox} name={item.id} checked={item.isCompleted} className='hover:scale-120' type="checkbox" />
                        <div className={item.isCompleted ? "line-through text-wrap w-fit" : "text-wrap w-fit"}>{item.todo}</div></div>
                      <div className='w-[68px] flex items-center justify-center'><button onClick={(e) => { handleEdit(e, item.id) }} className='border-1 bg-[#322f82] text-white font-bold pl-2 pr-2 rounded-[5px] p-1 hover:bg-[#310cd8] hover:scale-110'><FaEdit /></button>
                        <button onClick={(e) => { handleDelete(e, item.id) }} className='border-1 bg-[#322f82] text-white font-bold pl-2 pr-2 rounded-[5px] p-1 hover:bg-[#310cd8] hover:scale-110'><MdDelete /></button></div>
                    </li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

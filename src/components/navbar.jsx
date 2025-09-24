import React from 'react'
import Logo from '/to-do-list.svg'
import { FaHome } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";


const navbar = () => {
  return (
    <div className="bg-[#322f82] flex items-center justify-between p-3">
      <ul className='flex items-center pl-1.5 pr-1.5'>
        <li className='flex items-center justify-center gap-2 cursor-pointer hover:scale-110'><img className='w-10 h-10' src={Logo} alt="" /><span className='text-white font-bold text-2xl '>Task Reminder</span></li>
      </ul>
      <ul className='flex items-center pl-1.5 pr-1.5 gap-7 text-white font-bold mr-5'>
        <li className='cursor-pointer border-1 p-1 hover:bg-blue-900 hover:scale-110'><FaHome size={30}/></li>
        <li className='cursor-pointer border-1 p-1 hover:bg-blue-900 hover:scale-110'><FaTasks size={30} /></li>
      </ul>
    </div>
  )
}

export default navbar

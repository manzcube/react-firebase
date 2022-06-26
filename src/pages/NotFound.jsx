import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
  return (
    <div className="flex justify-center h-screen p-5 mt-48">
      <div className="w-6/12">
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
      <div className="w-6/12 flex-col flex">
        <h1 className='text-white font-bold text-[8ch]'>Error 404!</h1>
        <span className="text-white font-bold text-2xl">Looks like you've found the doorway to the great nothing . . . </span>        
        <Link to='/' className="my-4 rounded max-w-sm py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700">Home page</Link>     
      </div>        
    </div>
  )
}

export default NotFound
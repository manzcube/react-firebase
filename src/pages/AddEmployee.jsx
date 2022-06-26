import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

import { toast } from 'react-toastify';

const AddEmployee = () => {

  // Pieces of state and hooks
  const navigate = useNavigate()
  const [docData, setDocData] = useState({
    name: '',
    location: '',
    position: '',
    age: '',
  })

  // Deconstruction of state docData
  const { name, location, position, age } = docData

  const handleAddEmployee = async e => {
    e.preventDefault()
    const newEmployee = {
      name,
      location,
      position,
      age
    }
    try {
      // Calling firebase function
      await addDoc(collection(db, "employees"), newEmployee)
      // Return to home
      navigate('/')
      // Notify the user with toast.
      toast.success('Successfully created!' , {
        autoClose: 5000,
        pauseOnHover: false
      }) 
    } catch (err) {
       // Taking code and message from error.
       const { code, message } = err
       // Notify the user with toast.
       toast.error(`Error!, ${code, message}` , {
         autoClose: 5000,
         pauseOnHover: false
       })
    }     
  }

  return (
    <div className="h-screen w-full max-w-sm container mt-20 mx-auto">
      <form onSubmit={handleAddEmployee}>          
          
        <div className="w-full mb-5">
          <label 
            htmlFor="name" 
            className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
          >
            Name 
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={name}
            onChange={(e) => setDocData({ ...docData, name: e.target.value})}
            type="text"
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="w-full mb-5">
          <label 
            htmlFor="position" 
            className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
          >
            Position 
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={position}
            onChange={(e) => setDocData({ ...docData, position: e.target.value})}
            type="text"
            placeholder="Enter Position"
            required
          />
        </div>
        <div className="w-full mb-5">
          <label 
            htmlFor="location" 
            className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
          >
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={location}
            onChange={(e) => setDocData({ ...docData, location: e.target.value})}
            type="text"
            placeholder="Enter Location"
            required
          />
        </div>
        <div className="w-full mb-5">
          <label 
            htmlFor="age" 
            className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
          >
            Age
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={age}
            onChange={(e) => setDocData({ ...docData, age: e.target.value})}
            type="number"
            placeholder="Enter Age"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Employee
          </button>
        </div>
        <div className="text-center mt-4 text-red-500 bg-red-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <Link className='bg-red-300' to="/">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default AddEmployee
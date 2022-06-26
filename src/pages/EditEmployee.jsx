import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

import { toast } from 'react-toastify';

const EditEmployee = () => {

  // Pieces of state and hooks
  const navigate = useNavigate()
  const params = useParams()
  const [error, setError] = useState(false)
  const [docData, setDocData] = useState({
    name: '',
    location: '',
    position: '',
    age: 0,
  })

  // Deconstruction of state docData
  const { name, location, position, age } = docData

  // Retrieving of current employee's data
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "employees", params.id), (doc) => {
      if (doc.data()) {
        setDocData(doc.data())
      }
    });
  }, [])

  // Handling of data's update
  const handleEditEmployee = async e => {
    e.preventDefault()
    const updatedEmployee = {
      name,
      location,
      position,
      age
    }
    await setDoc(doc(db, "employees", params.id), updatedEmployee)
      .then(() => {
        // Return to home
        navigate('/')
        // Notify the user with toast.
        toast.success('Successfully updated!', {
          autoClose: 5000,
        })
      })
      .catch(err => {

        // Taking code and message from error.
        const errorCode = error.code;
        const errorMessage = error.message;

        // Notify the user with toast.
        toast.error(`Error!, code: ${errorCode, errorMessage}`, {
          autoClose: 10000,
        })
      }) 
  }

  // While data from firebase don't arrive, show no Data
  // CHANGE TO DO => check if the doc exists for wrong :id show no data while
  if(docData) {
    return (
      <div className="w-full max-w-sm h-screen container mt-20 mx-auto">
        <form onSubmit={handleEditEmployee}>          
            {/* {error ? (
              <div className="w-full mb-5 bg-red-300 text-red-500 font-bold py-2 px-4 rounded">
                {error}
              </div>
            ) : null} */}
          <div className="w-full mb-5">
            <label 
              htmlFor="name" 
              className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
            >
              Name 
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600'
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
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600'
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
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600'
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
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600'
              value={age}
              onChange={(e) => setDocData({ ...docData, age: e.target.value})}
              type="number"
              placeholder="Enter Age"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Update Employee
            </button>
          </div>
          <div className="text-center mt-4 text-red-500 bg-red-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <Link to="/">Cancel</Link>
        </div>
        </form>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <div className="w-full max-w-sm h-screen container mt-20 mx-auto">
          <p className='text-white w-full flex justify-center'>No data</p>
        </div>
      </React.Fragment>
    )
  }

  

  
}

export default EditEmployee
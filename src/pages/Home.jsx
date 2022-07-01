import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { db } from '../firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import DeleteButton from '../components/DeleteButton';

import { handleError } from '../errors/errorHandling';

const Home = () => {
  // Pieces of state and hooks.
  const [employees, setEmployees] = useState([])

  // Retrieving the data from firestore.
  useEffect(() => {
    const getData = async () => {
      try {
        // Calling firebase function
        const data = await getDocs(collection(db, "employees"))
        const dataArray = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        // Updating pieces of state
        setEmployees(dataArray)
      } catch (error) {
        // Hanlding error boundaries
        handleError(error)
      }
    }
    getData()
  }, [])

  // Handling deleting employee.
  const handleDeleteEmployee = async (id) => {
    try {
      // Calling firebase function.
      await deleteDoc(doc(db, "employees", id))      
      // Notify the user with toast.
      toast.success('Successfully deleted!' , {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false
      }) 
      // After notifying, refresh to show the changes.
      setTimeout(() => window.location.reload(), 2500)
    } catch (error) {
      // Hanlding error.
      handleError(error)
    }      
  }

  return (
    <div className='flex flex-col my-24 h-auto items-center bg-slate-800'>
      <div className="w-full flex items-start">
        <Link to="/add">
          <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 mb-20 rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle bg-green-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            <span className="pl-2 bg-green-400">Add Employee</span>
          </button>
        </Link>
      </div>
      {employees.map(employee => (
        <div 
          className='flex sm:flex-col justify-between items-center w-full max-w-lg bg-gray-100 mb-10 rounded-lg'
          key={employee.id}
        >
          <div className="flex-auto text-left px-4 py-2 m-2 bg-gray-100">
              <p className="text-gray-900 leading-none bg-gray-100">
                  {employee.name}
              </p>
              <p className="text-gray-600 mt-1 bg-gray-100">
                  {employee.position}
              </p>
              <p className="text-gray-600 bg-gray-100">
                  {employee.age} years old
              </p>
              <p className='inline-block text-sm font-semibold mt-1 bg-gray-100'>
                  {employee.location}
              </p>
          </div>
          <div className="flex text-right px-4 py-2 m-2 bg-gray-100">
            <Link
              to={`/edit/${employee.id}`}
              className='bg-gray-100'
              title="Edit Employee"
            >
              <div className="bg-gray-300 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit bg-gray-300"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </div>
            </Link>
            <DeleteButton onClick={() => handleDeleteEmployee(employee.id)} />
          </div>
        </div>
      ))}
      {/* <Modal /> */}
    </div>
  )
}

export default Home


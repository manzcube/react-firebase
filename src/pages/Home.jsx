import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom'

const Home = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocs(collection(db, "employees"))
        const dataArray = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setEmployees(dataArray)
        console.log('This is employees', employees)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const handleDeleteEmployee = async (id) => {
    await deleteDoc(doc(db, "employees", id))
    window.location.reload()
  }

  return (
    <div className='flex-col mt-24 h-full'>
      <Link to="/add">
        <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 mb-20 rounded inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          <span className="pl-2">Add Employee</span>
        </button>
      </Link>
      <div className="px-48">
        {employees.map(employee => (
          <div 
            className='flex items-center bg-gray-100 mb-10 shadow rounded'
            key={employee.id}
          >
            <div className="flex-auto text-left px-4 py-2 m-2">
                <p className="text-gray-900 leading-none">
                    {employee.name}
                </p>
                <p className="text-gray-600 mt-1">
                    {employee.position}
                </p>
                <p className="text-gray-600">
                    {employee.age} years old
                </p>
                <p className='inline-block text-sm font-semibold mt-1'>
                    {employee.location}
                </p>
            </div>
            <div className="flex-auto text-right px-4 py-2 m-2">
              <Link
                to={`/edit/${employee.id}`}
                title="Edit Employee"
              >
                <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </div>
              </Link>
              <button
                onClick={() => handleDeleteEmployee(employee.id)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center"
                  title="Remove Employee"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home


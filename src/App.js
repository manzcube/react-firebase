
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'
import Loading from "./pages/Loading";

function App() {
  // Pieces of state and hooks.
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Handle Login function.
  const handleLogIn = () => {
    // Create new Google Auth provider.
    const provider = new GoogleAuthProvider();

    // Calling firebase function function.
    signInWithPopup(auth, provider) 
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // Update pieces of state.
        setUser(user.displayName)

        // Notify the user with toast.
        toast.success(`Successfully logged in ${user.email}`, {
          autoClose: 5000,
        })

      }).catch((error) => {
        // Taking code and message from error.
        const errorCode = error.code;
        const errorMessage = error.message;

        // Notify the user with toast.
        toast.error(`Error!, code: ${errorCode, errorMessage}`, {
          autoClose: 10000,
        })
      });
  }

  // Handle Logout function.
  const handleLogOut = () => {
    // Calling firebase function.
    signOut(auth)
      .then(() => {
        // Update pieces of state.
        setUser(null)

        // Notify the user with toast.    
        toast.success('Successfully logged out!', {
          autoClose: 5000,
        })
      }).catch((error) => {
        // Taking code and message from error
        const errorCode = error.code;
        const errorMessage = error.message;

        // Notify the user with toast
        toast.error(`Error!, code: ${errorCode, errorMessage}`, {
          autoClose: 10000,
        })
      });
  }

  // Listening for firebase auth to change
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // if there is a user, update piece of state
      setUser(user?.displayName)
    })
  }, [auth])

  return (
    <div className="App bg-slate-800 p-4 h-full">
      <header className="App-header flex justify-between">
        <h1 className='text-white text-3xl font-bold cursor-pointer' onClick={() => navigate('/')}>Employees</h1>
        <div>
          {user ? (
            <div className="text-white">
              <span className="mr-2">{user}</span>
              <button 
                className="bg-red-400 px-2 rounded text-white" 
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          ) : (
            <button 
              className="text-white bg-red-400 px-2 rounded flex items-center" 
              onClick={handleLogIn}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Log In
            </button>
          )}
          <ToastContainer />
        </div>
      </header>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Loading />} />
        <Route path='/add' element={user ? <AddEmployee /> : <Loading />} />
        <Route path='/edit/:id' element={user ? <EditEmployee /> : <Loading />} />
      </Routes>
    </div>
  );
}

export default App;

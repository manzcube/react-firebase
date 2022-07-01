import React, { useState } from 'react'

const DeleteButton = (props) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  const handleOnClick = () => {
    if (deleteConfirmation) {
      props.onClick()
    } else {
      setDeleteConfirmation(true)
    }
  }

  return (
    <button
        onClick={() => handleOnClick()}
        className={`${deleteConfirmation ? 'bg-red-400 text-red-900' : 'bg-gray-300 text-gray-800'} font-semibold py-2 px-4 rounded-full inline-flex items-center`}
        title="Remove Employee"
    >
        {deleteConfirmation ? (
            <p className='bg-red-400'>You sure?</p>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 bg-gray-300"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        )}
    </button>
  )
}

export default DeleteButton
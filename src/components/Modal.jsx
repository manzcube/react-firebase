import React from "react";

const Modal = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="bg-teal-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto bg-transparent fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl rounded-lg">

              <div className="border-0 shadow-lg relative flex flex-col w-full outline-none focus:outline-none rounded-lg">
                
                <div className="relative p-6 flex justify-center bg-white rounded-t-lg">
                  <p className="mt-2 mb-0 text-slate-500 text-xl leading-relaxed bg-white">
                    You want to delete this item?
                  </p>
                </div>
                <div className="flex items-center justify-between p-6 bg-white rounded-b-lg">
                  <button
                    className="bg-red-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 mr-3.5"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 ml-3.5"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal
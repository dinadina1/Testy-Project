import React from "react";

const Alert = ({ onClose }) => {
  return (
    <div className="fixed top-15 left-0 right-0 bg-gray-700 text-white text-center p-4 z-50">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        {/* <h2>Admin :</h2> <br /> */}
        <div className="flex justify-start gap-10">
        <p>Email: admin@gmail.com</p>
        <p>Password: 123456</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-sm text-gray-400 hover:text-gray-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Alert;

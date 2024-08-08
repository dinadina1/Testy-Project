import React from 'react'

const TestSubmitted = () => {
  return (
    <div className="container p-10">
        <div className=" text-center border-2 shadow-xl w-full md:w-1/2 mx-auto p-5 ">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="size-24 mx-auto text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </span>
            <h1 className="my-5 text-gray-600 text-3xl font-bold">Assessment Submitted!</h1>
            <p className="my-5 text-gray-500 ">Your Assessment has been Submitted by the Admin</p>


        </div>
    </div>
  )
}

export default TestSubmitted
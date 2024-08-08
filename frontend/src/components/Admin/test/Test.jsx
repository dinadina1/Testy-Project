import React from 'react'
import { Link } from 'react-router-dom'

const Test = ({ copyToClipboard, test, handleDelete }) => {

    return (
        <>
            <div className='container p-1'>

                <div className="flex flex-wrap flex-row border border-l-4 border-l-blue-500 shadow-md rounded-md">
                    <div className="w-full md:w-2/5 pl-4 md:p-6 bg-gray-100">
                        <Link to={`/test/${test._id}`}>
                            <h2><strong className="text-lg text-gray-600 mb-2">Title:</strong> {test.title}</h2>
                            <p><strong className="text-gray-600 ">Description:</strong> {test.description}</p>                            
                        <p><strong className="text-gray-600 pe-1 mb-4">Total Questions:</strong> {test.questions.length}</p>
                        </Link>

                        <article className='hidden md:flex border-2 border-green-300 rounded cursor-pointer mt-2 w-1/2 md:w-full lg:w-1/2' onClick={() => copyToClipboard(test.testUrl)}>
                            <span className='border bg-green-400 p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                            </span>
                            <span className='font-semibold text-gray-500 text-sm my-auto py-1 px-2'>Copy test link</span>
                        </article>
                    </div>
                    <Link to={`/test/${test._id}`} className="w-full md:w-2/5 pl-4 md:p-6 bg-gray-100">
                        <p><strong className="text-gray-600 pe-1">Total Score:</strong> {test.totalScore}</p>
                        <p><strong className="text-gray-600 pe-1">Minimum Score:</strong> {test.minimumScore}</p>
                        <p><strong className="text-gray-600 pe-1">Expiry Date:</strong> {test.expiryDate}</p>
                        <p><strong className="text-gray-600 pe-1">Status:</strong>
                            <span className={test.status === "Active" ? "text-green-600 pe-1" : "text-red-600 pe-1"}>
                                {test.status}
                            </span>
                        </p>
                    </Link>
                    <div className="w-full md:w-1/5  bg-gray-100 flex flex-row md:flex-col justify-center gap-5 pe-3 py-3 md:py-0">
                        <article className='flex border-2 border-green-300 rounded cursor-pointer md:hidden ' onClick={() => copyToClipboard(test.testUrl)}>
                            <span className='border bg-green-400 p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                            </span>
                            <span className='hidden md:inline font-semibold text-gray-500 text-sm my-auto py-1 px-2'>Copy test link</span>
                        </article>

                        <Link to={`/test/${test._id}`} className='flex border-1 border-blue-400 bg-blue-400 rounded py-2 px-2 cursor-pointer md:w-3/4 md:mx-auto'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white md:me-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </span>
                            <span className='hidden md:inline font-semibold text-white text-sm'>Edit</span>
                        </Link>

                        <article onClick={() => handleDelete(test._id)} className='flex border-1 border-red-400 bg-red-400 rounded py-2 px-2 cursor-pointer md:w-3/4 md:mx-auto'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white md:me-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </span>
                            <span className='hidden md:inline font-semibold text-white text-sm'> Delete</span>
                        </article>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Test
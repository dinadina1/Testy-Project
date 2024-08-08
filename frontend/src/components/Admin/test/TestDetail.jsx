import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTest, updateTest } from '../../../actions/testActions';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../layout/Loader';
import Sidebar from '../../layout/Sidebar';
import { toast } from 'react-toastify';
import { clearIsTestUpdated } from '../../../slices/testSlice';

const TestDetail = () => {
    const dispatch = useDispatch();
    const { testId } = useParams();
    const { test = {}, loading, isUpdated } = useSelector((state) => state.testState);

    const [copyText, setCopyText] = useState('Copy Test Link');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(test.status);

    // Function to copy test link to clipboard
    const copyToClipboard = async (testUrl) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(testUrl);
                setCopyText('Copied');
                setTimeout(() => {
                    setCopyText('Copy Test Link');
                }, 3000);
            } else {
                // Fallback method
                const textarea = document.createElement("textarea");
                textarea.value = testUrl;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                setCopyText('Copied');
                setTimeout(() => {
                    setCopyText('Copy Test Link');
                }, 3000);
            }

            toast.success('Test link copied to clipboard', {
                position: 'bottom-center'
            });
            setCopyText('Copied');
            setTimeout(() => {
                setCopyText('Copy Test Link');
            }, 5000);
        } catch (err) {
            console.log(err);
            toast.error('Failed to copy the link', {
                position: 'bottom-center'
            });
        }
    };

    const changeTestStatus = () => {
        dispatch(updateTest(testId, { status: selectedStatus }))
    }

    useEffect(() => {
        dispatch(getTest(testId));
        if (isUpdated) {
            toast('Test status updated successfully', {
                type: 'success',
                position: 'bottom-center'
            });
            dispatch(clearIsTestUpdated())
        }
    }, [dispatch, testId, isUpdated]);

    return (
        <>
            {loading ? (
                <div className="flex justify-center mt-10">
                    <Loader />
                </div>
            ) : (
                <>

                    <div className="flex flex-col md:flex-row">
                        <Sidebar />
                        <div className="w-full md:w-5/6">
                            <div className='flex justify-between mx-2 md:mx-5 p-2 md:p-3'>
                                <Link to="/tests" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span>Back</span>
                                </Link>
                            </div>
                            <div className="p-0">
                                <h1 className="text-2xl md:text-5xl ps-1 md:ps-6 mt-5 mb-10">
                                    Test #{test._id}
                                </h1>
                            </div>
                            <div className="container flex flex-wrap">
                                <div className="w-full md:w-3/4">
                                    <h2 className="text-xl font-semibold ps-4 md:ps-10 py-3">Test Link</h2>
                                    <div>
                                        <a href={test.testUrl} target="_blank" rel="noopener noreferrer" className="ms-8 md:ms-20 my-3 text-blue-500">
                                            {test.testUrl}
                                        </a>
                                        <button onClick={() => copyToClipboard(test.testUrl)} className="border px-3 py-2 bg-blue-500 text-white rounded ms-10">
                                            {copyText}
                                        </button>
                                    </div>
                                    <h2 className="text-xl font-semibold ps-4 md:ps-10 py-3">Title</h2>
                                    <p className="ps-8 md:ps-20 py-3">{test.title}</p>
                                    <h2 className="text-xl font-semibold ps-4 md:ps-10 py-3">Description</h2>
                                    <p className="ps-8 md:ps-20 py-3">{test.description}</p>
                                    <hr className="my-3" />
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Total Questions:</span>{test?.questions?.length}
                                    </p>
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Total Score:</span>{test.totalScore}
                                    </p>
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Min Score:</span>{test.minimumScore}
                                    </p>
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Duration:</span>{test.duration} Minutes
                                    </p>
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Average Score:</span>30
                                    </p>
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Expiry Date:</span>{test.expiryDate}
                                    </p>
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Total Students Attended:</span>
                                        {test.attendedUsers && test.attendedUsers.length > 0 ? test.attendedUsers.length : "0"}
                                    </p>
                                    <hr className="my-3" />
                                    <h2 className="text-xl font-semibold ps-4 md:ps-10">Status</h2>
                                    <p className={test.status === "Active" ? "ps-8 md:ps-20 py-3 text-green-600" : "ps-8 md:ps-20 py-3 text-red-600"}>
                                        {test.status}
                                    </p>

                                    {test.topRank && test.topRank.score !== 0 && (
                                        <>
                                            <h2 className="text-xl font-semibold ps-4 md:ps-10">Top Rank Student</h2>
                                            <p className="ps-8 md:ps-20 py-3">
                                                <span className="font-semibold me-2">Name:</span>{`${test?.topRank?.userId.firstname} ${test?.topRank?.userId.lastname}`}
                                            </p>
                                            <p className="ps-8 md:ps-20 py-3">
                                                <span className="font-semibold me-2">Score:</span>{test?.topRank?.score}
                                            </p>
                                        </>
                                    )}

                                    <hr className='my-3' />
                                    <h2 className="text-xl font-semibold ps-4 md:ps-10">Created By</h2>
                                    <p className="ps-8 md:ps-20 py-3">{test?.createdBy?.username}</p>

                                    <hr />
                                    {/* show attended user details */}
                                    <h2 className="text-xl font-semibold ps-4 md:ps-10 py-3">Attended Students</h2>
                                    {test?.attendedUsers && test?.attendedUsers.length > 0 ? (
                                        <div className="overflow-x-auto shadow-md mx-5 my-2 mb-3">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Score</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Right Answer</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wrong Answer</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attended At</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {test.attendedUsers && test.attendedUsers.map((user, index) => (
                                                        <tr key={user._id}>
                                                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{`${user.userId.firstname} ${user.userId.lastname}`}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{user.userId.email}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{test.totalScore}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{user.score}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {user.score >= test.minimumScore ? (
                                                                    <span className='text-green-500'>PASS</span>
                                                                ) : (
                                                                    <span className='text-red-500'>FAIL</span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{user.correctAnswers}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{test.questions.length - user.correctAnswers}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{user.score ? (parseInt(user.score) / parseInt(test.totalScore)).toFixed(2) * 100 : 0}%</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{new Date(user.userId.createdAt).toLocaleString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="ps-8 md:ps-20 py-3">No students attended this test.</p>
                                    )}
                                </div>
                                <div className="w-full md:w-1/4">
                                    <label className='text-gray-600 mb-3 block font-semibold text-md'>Change Test Status</label>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="text-gray-700 hover:bg-gray-300 border focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center inline-flex items-center"
                                        type="button"
                                    >
                                        {selectedStatus ? selectedStatus : test.status} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>

                                    {dropdownOpen && (
                                        <>

                                            <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2">
                                                <ul className="py-2 text-sm text-gray-900 dark:text-gray-200">
                                                    <li onClick={() => {
                                                        setSelectedStatus("Active");
                                                        setDropdownOpen(!dropdownOpen)
                                                    }} className="block px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-900 hover:text-white dark:hover:bg-gray-600 ">
                                                        Active
                                                    </li>
                                                    <li onClick={() => {
                                                        setSelectedStatus("Inactive");
                                                        setDropdownOpen(!dropdownOpen)
                                                    }} className="block px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-900 hover:text-white dark:hover:bg-gray-600 ">
                                                        Inactive
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                    <hr className="my-1" />
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={changeTestStatus}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default TestDetail;

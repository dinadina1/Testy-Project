import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import Test from './Test';
import { toast } from 'react-toastify';
import { deleteTest, getTestsForPagination } from '../../../actions/testActions';
import { clearIsTestDeleted } from '../../../slices/testSlice';
import { Link } from 'react-router-dom';

const TestList = () => {
    const dispatch = useDispatch();
    const { tests = [], totalPagePagination = 0, isDeleted = false } = useSelector(state => state.testState);

    const PAGE_RANGE = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(totalPagePagination);

    // Function to handle page change
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    // Determine the range of pages to display
    const getPageRange = () => {
        const halfRange = Math.floor(PAGE_RANGE / 2);
        let startPage = Math.max(currentPage - halfRange, 1);
        let endPage = Math.min(currentPage + halfRange, totalPages);

        if (endPage - startPage + 1 < PAGE_RANGE) {
            if (startPage === 1) {
                endPage = Math.min(PAGE_RANGE, totalPages);
            } else if (endPage === totalPages) {
                startPage = Math.max(totalPages - PAGE_RANGE + 1, 1);
            }
        }

        return { startPage, endPage };
    };

    // Function to copy test link to clipboard
    const copyToClipboard = async (testUrl) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(testUrl);
            } else {
                // Fallback method
                const textarea = document.createElement("textarea");
                textarea.value = testUrl;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }

            toast.success('Test link copied to clipboard', {
                position: 'bottom-center'
            });
        } catch (err) {
            console.log(err);
            toast.error('Failed to copy the link', {
                position: 'bottom-center'
            });
        }
    };

    // function to delete test
    const handleDelete = (testId) => {
        dispatch(deleteTest(testId));
    };

    useEffect(() => {
        dispatch(getTestsForPagination(currentPage));
    }, [dispatch, currentPage]);

    useEffect(() => {
        setTotalPages(totalPagePagination);
        if (isDeleted) {
            toast('Test deleted successfully', {
                type: 'success',
                position: 'bottom-center',
                autoClose: 2000, // Close after 2 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onOpen: () => {
                    dispatch(clearIsTestDeleted());
                    dispatch(getTestsForPagination(currentPage));
                }
            });
        }
    }, [isDeleted, totalPagePagination, dispatch, currentPage]);

    const { startPage, endPage } = getPageRange();

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <Sidebar />
                <div className="w-full md:w-5/6 md:mx-8 lg:mx-10">
                    <div className="flex mx-auto justify-between p-4">
                        <h1 className="text-2xl md:text-4xl font-bold ps-6 md:ps-8 my-auto">Test List</h1>
                        <Link to={"/test/new"} id="new" className="px-3 md:px-6 flex items-center bg-blue-600 text-white text-sm md:text-lg font-semibold rounded-3xl hover:bg-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 my-auto mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span className="my-auto ms-2">New</span>
                        </Link>
                    </div>

                    {
                        tests && tests.length > 0 ? (
                            <div>
                                {tests.map((test, index) => (
                                    <Test key={index} test={test} copyToClipboard={copyToClipboard} handleDelete={handleDelete} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center p-5">
                                <h1 className="text-2xl font-bold">No Tests Found</h1>
                            </div>
                        )
                    }

                    {/* Pagination bar */}
                    {
                        tests?.length > 0 &&

                        <div className="flex items-center justify-center gap-2 md:gap-4 p-4 overflow-x-auto">
                            {/* First Button */}
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                            >
                                <span className='hidden lg:inline'>&larr;</span>  First
                            </button>
                            {/* Previous Button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                            >
                                <span className='hidden lg:inline'>&larr;</span> Prev
                            </button>

                            {/* Page Numbers */}
                            <div className="flex items-center gap-1 md:gap-2">
                                {startPage > 1 && (
                                    <>
                                        <button
                                            onClick={() => handlePageChange(1)}
                                            className="px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                                        >
                                            1
                                        </button>
                                        {startPage > 2 && (
                                            <span className="px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm font-medium text-gray-500">...</span>
                                        )}
                                    </>
                                )}
                                {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm font-medium rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                {endPage < totalPages && (
                                    <>
                                        {endPage < totalPages - 1 && (
                                            <span className="px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm font-medium text-gray-500">...</span>
                                        )}
                                        <button
                                            onClick={() => handlePageChange(totalPages)}
                                            className="px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                            >
                                Next <span className='hidden lg:inline'>&rarr;</span>
                            </button>
                            {/* Last Button */}
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                            >
                                Last <span className='hidden lg:inline'>&rarr;</span>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default TestList;

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getQuestionById } from '../../../actions/questionActions';
import Loader from '../../layout/Loader';
import { toast } from 'react-toastify';
import { clearQuestionError } from '../../../slices/questionSlice';
import Sidebar from '../../layout/Sidebar';

const QuestionDetail = () => {

    const dispatch = useDispatch();
    const { questionId } = useParams();
    let { question = {}, questions, loading = true, error = null } = useSelector((state) => state.questionState);

    question = questions.find((q) => q._id === questionId);


    useEffect(() => {
        dispatch(getQuestionById(questionId));
    }, [dispatch, questionId]);

    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
            });
            dispatch(clearQuestionError());
        }
    }, [dispatch, error]);

    return (
        <>
            {
                loading ? (
                    <div className='flex justify-center items-center h-screen'>
                        <Loader />
                    </div>
                ) : (

                    <div className="flex flex-col md:flex-row">
                        <Sidebar />
                        <div className="w-full md:w-5/6">
                            <div className='flex justify-between mx-2 md:mx-5 p-2 md:p-3'>
                                <Link to="/questions" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span>Back</span>
                                </Link>
                                <Link to={`/question/edit/${questionId}`} className='flex border-1 border-blue-400 bg-blue-400 rounded py-2 px-2 cursor-pointer'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white md:me-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </span>
                                    <span className='hidden md:inline font-semibold text-white text-sm'>Edit</span>
                                </Link>
                            </div>
                            <div className="p-2 md:p-4">
                                <h1 className="text-2xl md:text-5xl ps-1 md:ps-6 my-2">
                                    Question #{question?._id}
                                </h1>
                            </div>
                            <div className="container flex flex-wrap">
                                <div className="w-full md:w-3/4">
                                    <h2 className="text-xl font-semibold ps-4 md:ps-10 py-3">Question:</h2>
                                    <p className="ps-8 md:ps-20 py-3">{question?.questionText}</p>
                                    <h2 className="text-xl font-semibold ps-4 md:ps-10 py-3">Options</h2>
                                    {question?.options && question?.options.map((option, index) => (
                                        <p key={index} className="ps-8 md:ps-20 py-3">
                                            <span className="font-semibold me-2">{`Option ${index + 1} :`}</span>{option?.optionText}
                                        </p>
                                    ))}
                                    <hr className="my-3" />
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Correct Answer:</span>{question?.rightAnswer}
                                    </p>
                                    <hr className="my-3" />
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Difficulty:</span>{question?.difficulty}
                                    </p>
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Test:</span>{question?.test?.title}
                                    </p>
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Test Description:</span>{question?.test?.description}
                                    </p>
                                    <p className="ps-8 md:ps-20 py-3">
                                        <span className="font-semibold me-2">Created By: </span>
                                        {question?.createdBy?.username}
                                    </p>
                                    <hr className="my-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default QuestionDetail
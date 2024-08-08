import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import { useSelector } from 'react-redux';
import { deleteQuestion, getQuestionsParticularTest } from '../../../actions/questionActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearIsQuestionDeleted, clearQuestionError } from '../../../slices/questionSlice';

const QuestionList = () => {
    const dispatch = useDispatch();
    const { tests = [] } = useSelector(state => state.testState);
    const { questions = [], isDeleted, error } = useSelector(state => state.questionState);

    const [testId, setTestId] = useState('');

    const getQuestions = () => {
        if (testId) {
            dispatch(getQuestionsParticularTest(testId));
        } else {
            toast('Please select a test', {
                type: 'warning',
                position: 'bottom-center',
            });
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteQuestion(id));
    };

    const checktestId = () => {
        if (testId === "") {
            toast('Please select a test', {
                type: 'warning',
                position: 'bottom-center',
            });
        }
    }

    useEffect(() => {
        if (isDeleted) {
            toast('Deleted Successfully', {
                type: 'success',
                position: 'bottom-center',
            });
            dispatch(getQuestionsParticularTest(testId));
            dispatch(clearIsQuestionDeleted());
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
            });
            dispatch(clearQuestionError());
        }
    }, [isDeleted, error, dispatch, testId]);

    return (
        <>
            <div className="flex flex-row">
                <Sidebar />
                <div className="w-full md:w-5/6">
                    <div className="flex mx-auto justify-between p-4">
                        <h1 className="text-2xl md:text-4xl font-bold ps-6 md:ps-8 my-auto">Question List</h1>
                    </div>

                    <div className="container">
                        <div className="flex flex-col p-4 md:ms-44 justify-center">
                            <label htmlFor="test" className="text-gray-600 text-md font-semibold">Select test:</label>
                            <div className="flex gap-3">
                                <select
                                    id="test"
                                    name="test"
                                    className="text-md w-1/2 p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                    onChange={(e) => setTestId(e.target.value)}
                                >
                                    <option value="">Select Test</option>
                                    {tests.map((test, index) => (
                                        <option key={index} value={test._id}>{test.title}</option>
                                    ))}
                                </select>
                                <button onClick={getQuestions} className="py-2 px-4 text-white bg-green-400 font-semibold rounded">Search</button>
                            </div>
                        </div>

                        {questions.length > 0 ? (
                            <>
                                <div className="flex justify-between mx-2 md:mx-10 my-2">
                                    <h1 className="text-xl md:text-3xl font-semibold md:ps-8 my-auto">{questions[0]?.test?.title}</h1>
                                    <button onClick={checktestId}>
                                        <Link to={testId && `/question/new/${testId}`} className="flex mt-4 px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 my-auto mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <span className="hidden md:inline-block">Add Question</span>
                                            <span className="inline-block md:hidden">Add</span>
                                        </Link>
                                    </button>
                                </div>
                                <div className="overflow-x-auto shadow-md mx-5">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correct Option</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {questions.map((question, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Link to={`/question/${question._id}`} className="hover:underline">{question.questionText.length > 25 ? `${question.questionText.slice(0, 25)}...` : question.questionText}</Link>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{question.rightAnswer}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{question.difficulty}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Link to={`/question/edit/${question._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                                        <button onClick={() => handleDelete(question._id)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-4">
                                <p className="text-gray-500">No questions found</p>
                                <p className="text-gray-500">Please add a new question</p>
                                <Link to={testId && `/question/new/${testId}`}>
                                    <button
                                        className="flex mt-4 px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-3"
                                        disabled={!testId}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 my-auto mx-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <span className="hidden md:inline-block">Add Question</span>
                                        <span className="inline-block md:hidden">Add</span>
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </>
    );
};

export default QuestionList;

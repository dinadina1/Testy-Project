import React, { useEffect } from 'react';
import Sidebar from '../../layout/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionById, updateQuestion } from '../../../actions/questionActions';
import { toast } from 'react-toastify';
import { clearIsQuestionUpdated, clearQuestionError } from '../../../slices/questionSlice';

// validate formik
const validate = (values) => {
    const errors = {};
    if (!values.question) errors.question = 'Required';
    if (!values.option1) errors.option1 = 'Required';
    if (!values.option2) errors.option2 = 'Required';
    if (!values.option3) errors.option3 = 'Required';
    if (!values.option4) errors.option4 = 'Required';
    if (!values.rightAnswer) errors.rightAnswer = 'Required';
    if (!values.difficulty) errors.difficulty = 'Required';
    return errors;
};

const EditQuestion = () => {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    const { question = {}, loading = true, error = null, isUpdated = false } = useSelector(state => state.questionState);

    useEffect(() => {
        dispatch(getQuestionById(questionId));
    }, [dispatch, questionId]);

    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearQuestionError()),
            });
        }
        if (isUpdated) {
            toast('Question updated successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearIsQuestionUpdated()),
            });
        }
    }, [dispatch, error, isUpdated]);

    const formik = useFormik({
        initialValues: {
            question: question.questionText || '',
            option1: question?.options?.[0]?.optionText || '',
            option2: question?.options?.[1]?.optionText || '',
            option3: question?.options?.[2]?.optionText || '',
            option4: question?.options?.[3]?.optionText || '',
            rightAnswer: question.rightAnswer || '',
            difficulty: question.difficulty || '',
        },
        enableReinitialize: true,
        validate,
        onSubmit: (values) => {
            const options = [
                { optionText: values.option1, option: false },
                { optionText: values.option2, option: false },
                { optionText: values.option3, option: false },
                { optionText: values.option4, option: false },
            ];

            const newOptions = options.map((opt) =>
                opt.optionText === values.rightAnswer
                    ? { optionText: opt.optionText, option: true }
                    : opt
            );

            const rightOption = newOptions.map((opt) => opt.option);

            const formData = {
                questionText: values.question,
                options: newOptions,
                rightOption,
                rightAnswer: values.rightAnswer,
                difficulty: values.difficulty,
            };

            dispatch(updateQuestion(questionId, formData));
        },
    });

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="w-full bg-gray-50">
                <div className="flex justify-between mx-2 md:mx-5 p-2 md:p-3">
                    <Link to={`/question/${questionId}`} className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back</span>
                    </Link>
                </div>
                <h1 className="text-left text-3xl md:text-4xl ms-2 md:ms-16 text-gray-800 font-bold pt-2">Edit Question</h1>
                <section className="p-5 md:p-5 bg-white-300 font-sans min-h-screen bg-gray-50">
                    <div className="container w-full md:w-4/5 lg:w-3/5 mx-auto shadow-xl shadow-gray-400 rounded-lg border bg-gray-100">
                        <form className="p-5" onSubmit={formik.handleSubmit}>
                            <div className="my-5">
                                <label htmlFor="question" className="w-full text-lg text-gray-600 font-semibold">Question</label>
                                <input
                                    type="text"
                                    id="question"
                                    name="question"
                                    className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                    placeholder="Enter question"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.question}
                                />
                                {formik.errors.question && formik.touched.question && (
                                    <div className="text-red-500 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        <span className="my-auto ms-1">{formik.errors.question}</span>
                                    </div>
                                )}
                            </div>
                            <div className="my-5">
                                <label htmlFor="option1" className="w-full text-lg text-gray-600 font-semibold">Option 1</label>
                                <input
                                    type="text"
                                    id="option1"
                                    name="option1"
                                    className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                    placeholder="Enter option 1"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.option1}
                                />
                                {formik.errors.option1 && formik.touched.option1 && (
                                    <div className="text-red-500 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        <span className="my-auto ms-1">{formik.errors.option1}</span>
                                    </div>
                                )}
                            </div>
                            <div className="my-5">
                                <label htmlFor="option2" className="w-full text-lg text-gray-600 font-semibold">Option 2</label>
                                <input
                                    type="text"
                                    id="option2"
                                    name="option2"
                                    className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                    placeholder="Enter option 2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.option2}
                                />
                                {formik.errors.option2 && formik.touched.option2 && (
                                    <div className="text-red-500 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        <span className="my-auto ms-1">{formik.errors.option2}</span>
                                    </div>
                                )}
                            </div>
                            <div className="my-5">
                                <label htmlFor="option3" className="w-full text-lg text-gray-600 font-semibold">Option 3</label>
                                <input
                                    type="text"
                                    id="option3"
                                    name="option3"
                                    className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                    placeholder="Enter option 3"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.option3}
                                />
                                {formik.errors.option3 && formik.touched.option3 && (
                                    <div className="text-red-500 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        <span className="my-auto ms-1">{formik.errors.option3}</span>
                                    </div>
                                )}
                            </div>
                            <div className="my-5">
                                <label htmlFor="option4" className="w-full text-lg text-gray-600 font-semibold">Option 4</label>
                                <input
                                    type="text"
                                    id="option4"
                                    name="option4"
                                    className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                    placeholder="Enter option 4"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.option4}
                                />
                                {formik.errors.option4 && formik.touched.option4 && (
                                    <div className="text-red-500 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        <span className="my-auto ms-1">{formik.errors.option4}</span>
                                    </div>
                                )}
                            </div>
                            <div className="my-5">
                                <label htmlFor="rightAnswer" className="w-full text-lg text-gray-600 font-semibold">Right Answer</label>
                                <input
                                    type="text"
                                    id="rightAnswer"
                                    name="rightAnswer"
                                    className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                    placeholder="Enter right answer"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.rightAnswer}
                                    disabled={!formik.values.option1 || !formik.values.option2 || !formik.values.option3 || !formik.values.option4}
                                />
                                {formik.errors.rightAnswer && formik.touched.rightAnswer && (
                                    <div className="text-red-500 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        <span className="my-auto ms-1">{formik.errors.rightAnswer}</span>
                                    </div>
                                )}
                            </div>
                            <div className="my-5">
                                <label htmlFor="difficulty" className="w-full text-lg text-gray-600 font-semibold">Difficulty</label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.difficulty}
                                >
                                    <option value="" disabled>Select difficulty</option>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                                {formik.errors.difficulty && formik.touched.difficulty && (
                                    <div className="text-red-500 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        <span className="my-auto ms-1">{formik.errors.difficulty}</span>
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 mt-5 bg-blue-500 hover:bg-blue-600 text-lg text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Question'}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EditQuestion;

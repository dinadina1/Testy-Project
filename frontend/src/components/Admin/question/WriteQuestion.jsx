import React, { useEffect, } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { newQuestion } from '../../../actions/questionActions';
import { clearIsQuestionCreated, clearQuestionError } from '../../../slices/questionSlice';

// validate formik
const validate = (values) => {
    const errors = {};
    if (!values.question) {
        errors.question = 'Required';
    }
    if (!values.option1) {
        errors.option1 = 'Required';
    }
    if (!values.option2) {
        errors.option2 = 'Required';
    }
    if (!values.option3) {
        errors.option3 = 'Required';
    }
    if (!values.option4) {
        errors.option4 = 'Required';
    }
    if (!values.rightAnswer) {
        errors.rightAnswer = 'Required';
    }
    if (!values.difficulty) {
        errors.difficulty = 'Required';
    }
    return errors;
}

const WriteQuestion = () => {

    const { testId } = useParams();
    const dispatch = useDispatch();
    const { isCreated = false, error = null } = useSelector(state => state.questionState);

    useEffect(() => {
        if (isCreated) {
            toast("Question added successfully", {
                type: "success",
                position: 'bottom-center',
                onOpen: () => dispatch(clearIsQuestionCreated())
            })
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearQuestionError())
            })
        }
    }, [isCreated, error]);

    const formik = useFormik({
        initialValues: {
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            rightAnswer: '',
            rightOption: [],
            difficulty: ''
        },
        validate,
        onSubmit: (values) => {

            let options = [
                {
                    optionText: values.option1,
                    option: false
                },
                {
                    optionText: values.option2,
                    option: false
                },
                {
                    optionText: values.option3,
                    option: false
                },
                {
                    optionText: values.option4,
                    option: false
                }
            ];

            // find correct optiontext
            let newOptions = options.map((opt) => {
                if (opt.optionText === values.rightAnswer) {
                    return {
                        optionText: opt.optionText,
                        option: true
                    }
                }
                return opt;
            })

            // find correct options
            let rightOption = newOptions.map((opt) => {
                return opt.option
            });

            const formData = {
                questionText: values.question,
                options: newOptions,
                rightOption: rightOption,
                rightAnswer: values.rightAnswer,
                difficulty: values.difficulty
            }

            dispatch(newQuestion(testId, formData));
            formik.resetForm();
        }
    });

    return (
        <>
            <section className="p-5 md:p-5 bg-white-300 font-sans min-h-screen bg-gray-50">
                <div className="container w-full md:w-4/5 lg:w-3/5 mx-auto shadow-xl shadow-gray-400 rounded-lg border bg-gray-100">

                    <form className="p-5" onSubmit={formik.handleSubmit}>
                        <div className="my-5">
                            <label htmlFor="question" className="w-full text-lg text-gray-600 font-semibold">Question</label>
                            <input
                                type="text"
                                id="question"
                                name='question'
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                placeholder="Enter question"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.question}
                            />
                            {/* display error message if question is invalid */}
                            {
                                formik.errors.question && formik.touched.question &&
                                <div className='text-red-500 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                    <span className='my-auto ms-1'>{formik.errors.question}</span>
                                </div>
                            }
                        </div>
                        <div className="my-5">
                            <label htmlFor="option1" className="w-full text-lg text-gray-600 font-semibold">Option 1</label>
                            <input
                                type="text"
                                id="option1"
                                name='option1'
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                placeholder="Enter option 1"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.option1}
                            />
                            {/* display error message if option1 is invalid */}
                            {
                                formik.errors.option1 && formik.touched.option1 &&
                                <div className='text-red-500 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                    <span className='my-auto ms-1'>{formik.errors.option1}</span>
                                </div>
                            }
                        </div>
                        <div className="my-5">
                            <label htmlFor="option2" className="w-full text-lg text-gray-600 font-semibold">Option 2</label>
                            <input
                                type="text"
                                id="option2"
                                name='option2'
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                placeholder="Enter option 2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.option2}
                            />
                            {/* display error message if option2 is invalid */}
                            {
                                formik.errors.option2 && formik.touched.option2 &&
                                <div className='text-red-500 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                    <span className='my-auto ms-1'>{formik.errors.option2}</span>
                                </div>
                            }
                        </div>
                        <div className="my-5">
                            <label htmlFor="option3" className="w-full text-lg text-gray-600 font-semibold">Option 3</label>
                            <input
                                type="text"
                                id="option3"
                                name='option3'
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                placeholder="Enter option 3"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.option3}
                            />
                            {/* display error message if option 3is invalid */}
                            {
                                formik.errors.option3 && formik.touched.option3 &&
                                <div className='text-red-500 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                    <span className='my-auto ms-1'>{formik.errors.option3}</span>
                                </div>
                            }
                        </div>
                        <div className="my-5">
                            <label htmlFor="option4" className="w-full text-lg text-gray-600 font-semibold">Option 4</label>
                            <input
                                type="text"
                                id="option4"
                                name='option4'
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                placeholder="Enter option 4"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.option4}
                            />
                            {/* display error message if option4 is invalid */}
                            {
                                formik.errors.option4 && formik.touched.option4 &&
                                <div className='text-red-500 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                    <span className='my-auto ms-1'>{formik.errors.option4}</span>
                                </div>
                            }
                        </div>

                        <div className='flex gap-3'>
                            <div className='my-5 w-1/2'>
                                <label htmlFor="difficulty" className="text-gray-600 text-md font-semibold">Select difficulty level:</label>
                                {/* dropdown for select difficulty */}
                                <div className="flex gap-3">
                                    <select
                                        id="difficulty"
                                        name="difficulty"
                                        className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.difficulty}
                                    >
                                        <option value="">Select Level</option>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>

                                    </select>
                                </div>
                                {
                                    formik.errors.difficulty && formik.touched.difficulty &&
                                    <div className='text-red-500 text-sm'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        <span className='my-auto ms-1'>{formik.errors.difficulty}</span>
                                    </div>
                                }
                            </div>
                            <div className='my-5 w-1/2'>
                                <label htmlFor="rightAnswer" className="text-gray-600 text-md font-semibold">Select right answer :</label>
                                {/* dropdown for select rightAnswer */}
                                <div className="flex gap-3">
                                    <select
                                        id="rightAnswer"
                                        name="rightAnswer"
                                        className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.rightAnswer}
                                        disabled={formik.values.option4 && formik.values.option3 && formik.values.option2 && formik.values.option1 ? false : true}
                                    >
                                        <option value="">Select right answer</option>
                                        <option value={formik.values.option1}>{formik.values.option1}</option>
                                        <option value={formik.values.option2}>{formik.values.option2}</option>
                                        <option value={formik.values.option3}>{formik.values.option3}</option>
                                        <option value={formik.values.option4}>{formik.values.option4}</option>
                                    </select>
                                </div>
                                {
                                    formik.errors.rightAnswer && formik.touched.rightAnswer &&
                                    <div className='text-red-500 text-sm'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        <span className='my-auto ms-1'>{formik.errors.rightAnswer}</span>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="text-center py-2 my-4">
                            <button type="submit" onClick={formik.handleSubmit}
                                className="border-2 w-full py-4 rounded-full bg-blue-600 text-white font-bold">Create</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default WriteQuestion
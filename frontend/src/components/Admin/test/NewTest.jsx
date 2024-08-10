import React, { useEffect } from 'react'
import Sidebar from '../../layout/Sidebar'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { newTest } from '../../../actions/testActions';
import { toast } from 'react-toastify';
import { clearIsTestCreated, clearTestError } from '../../../slices/testSlice';

const validate = (values) => {
    const errors = {};
    // check if title is valid
    if (!values.title) {
        errors.title = 'Title is required';
    } else if (values.title.length > 40) {
        errors.title = 'Title is must be 40 characters or less';
    }
    // check if description is valid
    if (!values.description) {
        errors.description = 'Description is required';
    } 
    // check if totalScore is valid
    if (!values.totalScore) {
        errors.totalScore = 'TotalScore is required';
    } else if (isNaN(values.totalScore)) {
        errors.totalScore = 'TotalScore is must be a number';
    }
    // check if minimumScore is valid
    if (!values.minimumScore) {
        errors.minimumScore = "Minimum Score is required"
    } else if (isNaN(values.minimumScore)) {
        errors.minimumScore = "Minimum Score is must be a number"
    }
    // check if duration is valid
    if (!values.duration) {
        errors.duration = 'Duration is required';
    } else if (isNaN(values.duration)) {
        errors.duration = 'Duration is must be a number';
    }
    // check if expiryDate is valid
    if (!values.expiryDate) {
        errors.expiryDate = 'Expiry Date is required';
    } else if (values.expiryDate < new Date().toISOString().split('T')[0]) {
        errors.expiryDate = 'Expiry Date is must be greater than today';
    }
    return errors;
}

const NewTest = () => {

    const dispatch = useDispatch();
    const {isTestCreated=false, error=null} = useSelector(state => state.testState);

    useEffect(()=> {
        if(isTestCreated){
            toast("Test Created Successfully", { 
                type: "success" ,
                position: 'bottom-center'
            })
            dispatch(clearIsTestCreated());
        }
        if(error){
            toast(error, {
                type:'error',
                position: 'bottom-center'
            })
            dispatch(clearTestError());
        }
    },[isTestCreated, error]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            totalScore: '',
            minimumScore: '',
            duration: '',
            expiryDate: ''
        },
        validate,
        onSubmit: (values) => {
            const formData = {
                title: values.title,
                description: values.description,
                totalScore: values.totalScore,
                minimumScore: values.minimumScore,
                duration: values.duration.toString(),
                expiryDate: values.expiryDate
            }            
            dispatch(newTest(formData));
            formik.resetForm();
        }
    });
    return (
        <>
            <div className="flex flex-col md:flex-row">
                <Sidebar />

                <div className='w-full'>
                    <h1 className="text-left text-3xl md:text-4xl ms-2 md:ms-24 text-gray-800 font-bold pt-5  ">Create New Test</h1>
                    <section className="p-5 md:p-10 bg-white-300 font-sans min-h-screen bg-gray-50">
                        <div className="container w-full md:w-4/5 lg:w-3/5 mx-auto shadow-xl shadow-gray-400 rounded-lg border bg-gray-100">


                            <form className="p-5" onSubmit={formik.handleSubmit}>
                                <div className="my-5">
                                    <label htmlFor="title" className="w-full text-lg text-gray-600 font-semibold">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name='title'
                                        className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                        placeholder="Enter Test Title"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.title}
                                    />
                                    {/* display error message if title is invalid */}
                                    {
                                        formik.errors.title && formik.touched.title &&
                                        <div className='text-red-500 text-sm'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg>
                                            <span className='my-auto ms-1'>{formik.errors.title}</span>
                                        </div>
                                    }
                                </div>

                                <div className="my-5">
                                    <label htmlFor="description" className="w-full text-lg text-gray-600 font-semibold">Description</label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        name='description'
                                        className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                        placeholder="Enter Test Description"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description}
                                    />
                                    {/* display error message if description is invalid */}
                                    {
                                        formik.errors.description && formik.touched.description &&
                                        <div className='text-red-500 text-sm'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg>
                                            <span className='my-auto ms-1'>{formik.errors.description}</span>
                                        </div>
                                    }

                                </div>

                                <div className="my-5">
                                    <label htmlFor="totalScore" className="w-full text-lg text-gray-600 font-semibold">Total Score</label>
                                    <input
                                        type="number"
                                        id="totalScore"
                                        name='totalScore'
                                        className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                        placeholder="Ex: 50"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.totalScore}
                                    />

                                    {/* display error message if totalScore is invalid */}
                                    {
                                        formik.errors.totalScore && formik.touched.totalScore &&
                                        <div className='text-red-500 text-sm'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg>
                                            <span className='my-auto ms-1'>{formik.errors.totalScore}</span>
                                        </div>
                                    }
                                </div>

                                <div className="my-5">
                                    <label htmlFor="minimumScore" className="w-full text-lg text-gray-600 font-semibold">Minimum Score</label>
                                    <input
                                        type="number"
                                        id="minimumScore"
                                        name='minimumScore'
                                        className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                        placeholder="Ex: 20"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.minimumScore}
                                    />

                                    {/* display error message if minimumScore is invalid */}
                                    {
                                        formik.errors.minimumScore && formik.touched.minimumScore &&
                                        <div className='text-red-500 text-sm'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg>
                                            <span className='my-auto ms-1'>{formik.errors.minimumScore}</span>
                                        </div>
                                    }
                                </div>

                                <div className="my-5">
                                    <label htmlFor="duration" className="w-full text-lg text-gray-600 font-semibold">Duration in minutes</label>
                                    <input
                                        type="number"
                                        id="duration"
                                        name='duration'
                                        className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                        placeholder="Ex: 50"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.duration}
                                    />

                                    {/* display error message if duration is invalid */}
                                    {
                                        formik.errors.duration && formik.touched.duration &&
                                        <div className='text-red-500 text-sm'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg>
                                            <span className='my-auto ms-1'>{formik.errors.duration}</span>
                                        </div>
                                    }
                                </div>

                                <div className="my-5">
                                    <label htmlFor="expiryDate" className="w-full text-lg text-gray-600 font-semibold">Expiry Date</label>
                                    <input
                                        type="date"
                                        id="expiryDate"
                                        name='expiryDate'
                                        className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                        placeholder="Ex: 01/01/2025"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.expiryDate}
                                    />

                                    {/* display error message if expiryDate is invalid */}
                                    {
                                        formik.errors.expiryDate && formik.touched.expiryDate &&
                                        <div className='text-red-500 text-sm'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg>
                                            <span className='my-auto ms-1'>{formik.errors.expiryDate}</span>
                                        </div>
                                    }
                                </div>

                                <div className="text-center py-2 my-4">
                                    <button type="submit" onClick={formik.handleSubmit}
                                        className="border-2 w-full py-4 rounded-full bg-blue-600 text-white font-bold">Create</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default NewTest
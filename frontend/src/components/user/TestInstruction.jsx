import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTestUser, registerUser } from '../../actions/userActions';
import { useFormik } from 'formik';

// formik validation
const validate = values => {
    const errors = {};
    // check if firstname is valid
    if (!values.firstname) {
        errors.firstname = "First name is Required";
    }
    // check if lastname is valid 
    if (!values.lastname) {
        errors.lastname = "Last name is Required";
    }
    // check if email is valid 
    if (!values.email) {
        errors.email = "Email is Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    // check if phone no is valid 
    if (!values.phoneNo) {
        errors.phoneNo = "Phone no is Required";
    } else if (isNaN(values.phoneNo)) {
        errors.phoneNo = 'Invalid phone no';
    } else if (values.phoneNo.length !== 10) {
        errors.phoneNo = 'Phone no must be 10 characters';
    }

    return errors;
};

const TestInstruction = () => {

    const dispatch = useDispatch();
    const { testId } = useParams();
    const navigate = useNavigate();
    const { isAuthUser } = useSelector(state => state.userState);

    // useEffect(() => {
    //     dispatch(getTestUser());
    // }, [dispatch]);

    useEffect(() => {
        if (isAuthUser) {
            navigate(`/${testId}`);
        }
    }, [isAuthUser, testId, navigate]);

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phoneNo: ''
        },
        validate,
        onSubmit: values => {
            dispatch(registerUser(values));
        }
    });

    return (
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2">
            <article className="p-5 md:h-4/6 lg:h-5/6 overflow-auto">
                <h2 className="text-2xl font-bold py-2 text-gray-600">Instructions Before Taking the Test</h2>
                <ol type="1">
                    <li className="text-gray-600 py-2 ">
                        <strong className="text-gray-600 font-bold text-lg">Prepare Your Environment:</strong>
                        Ensure you are in a quiet, comfortable place with a stable internet connection.
                    </li>
                    <li className="text-gray-600 py-2 ">
                        <strong className="text-gray-600 font-bold text-lg">Gather Materials:</strong> Have any
                        allowed materials, such as a calculator or scratch paper, ready.
                    </li>
                    <li className="text-gray-600 py-2 ">
                        <strong className="text-gray-600 font-bold text-lg">Check Equipment:</strong>
                        Verify that your computer, mouse, and keyboard are functioning properly.
                    </li>
                    <li className="text-gray-600 py-2 ">
                        <strong className="text-gray-600 font-bold text-lg">Disable Distractions:</strong>
                        Close all unnecessary tabs and applications to avoid distractions and potential rule violations.
                    </li>
                    <li className="text-gray-600 py-2 ">
                        <strong className="text-gray-600 font-bol text-lg">Stay Focused:</strong> Remain on the
                        test tab and concentrate fully on the questions to achieve the best score.
                    </li>
                    <li className="text-gray-600 font-bold py-2 ">
                        All the best! Give it your best effort.
                    </li>
                </ol>
            </article>

            <article>
                <form onSubmit={formik.handleSubmit}>
                    <h2 className="text-2xl p-3 ms-2 font-bold text-gray-600">Please Fill the Details! </h2>
                    <div className="flex flex-col lg:flex-row lg:justify-between px-5">
                        <div className="my-3 lg:my-5">
                            <label htmlFor="firstname" className="w-full text-lg text-gray-600 font-semibold">First Name</label>
                            <input type="text" id="firstname"
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                placeholder="Enter Your First Name"
                                name='firstname'
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {/* error message for firstname*/}
                            {
                                formik.errors.firstname && formik.touched.firstname &&
                                <div className='text-red-500 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                    <span className='my-auto ms-1'>{formik.errors.firstname}</span>
                                </div>
                            }
                        </div>
                        <div className="my-3 lg:my-5">
                            <label htmlFor="lastname" className="w-full text-lg text-gray-600 font-semibold">Last Name</label>
                            <input type="text" id="lastname"
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                placeholder="Enter Your Last Name"
                                name='lastname'
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {/* error message for lastname*/}
                            {
                                formik.errors.lastname && formik.touched.lastname &&
                                <div className='text-red-500 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                    <span className='my-auto ms-1'>{formik.errors.lastname}</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="my-3 px-5">
                        <label htmlFor="email" className="w-full text-lg text-gray-600 font-semibold">Email</label>
                        <input type="email" id="email"
                            className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                            placeholder="Enter Your Email"
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* error message for email*/}
                        {
                            formik.errors.email && formik.touched.email &&
                            <div className='text-red-500 text-sm'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                <span className='my-auto ms-1'>{formik.errors.email}</span>
                            </div>
                        }
                    </div>
                    <div className="my-5 px-5">
                        <label htmlFor="phone" className="w-full text-lg text-gray-600 font-semibold">Phone No</label>
                        <input type="tel" id="phone"
                            className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                            placeholder="Enter Your Phone No"
                            name='phoneNo'
                            value={formik.values.phoneNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* error message for phone no*/}
                        {
                            formik.errors.phoneNo && formik.touched.phoneNo &&
                            <div className='text-red-500 text-sm'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                <span className='my-auto ms-1'>{formik.errors.phoneNo}</span>
                            </div>
                        }
                    </div>
                    <div className="mt-10 px-5 text-center">
                        <button type="submit"
                            className="px-3 md:px-10 py-2 bg-blue-600 text-white text-sm md:text-lg font-semibold rounded-3xl active:bg-blue-500">Next</button>
                    </div>

                </form>
            </article>
        </div>
    );
}

export default TestInstruction;

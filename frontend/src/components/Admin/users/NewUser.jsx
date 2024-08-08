import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, getAllAuthUsers } from '../../../actions/authActions';
import { toast } from 'react-toastify';
import { clearAuthError, clearIsUserCreated } from '../../../slices/authSlice';
import { Link } from 'react-router-dom';

// formik validation
const validate = values => {
    const errors = {};
    // check if email is valid
    if (!values.email) {
        errors.email = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    // check if password is valid
    if (!values.password) {
        errors.password = 'Password is Required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }
    // check if name is valid
    if (!values.name) {
        errors.name = 'Name is Required';
    } else if (values.name.length < 3) {
        errors.name = 'Name must be at least 3 characters';
    }
    // check if role is valid
    if (!values.role) {
        errors.role = 'Role is Required';
    }

    return errors;
}

const NewUser = () => {

    const dispatch = useDispatch();
    const { error = null, isCreated = false } = useSelector(state => state.authState);

    // Formik
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: ''
        },
        validate,
        onSubmit: values => {

            const formData = {
                username: values.name,
                email: values.email,
                password: values.password,
                role: values.role
            }
            dispatch(createNewUser(formData));
            formik.resetForm();
        }
    });

    useEffect(() => {
        if (isCreated) {
            toast('User Created Successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearIsUserCreated())
            })
            dispatch(getAllAuthUsers());
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearAuthError())
            })
        }
    }, [dispatch, isCreated, error])

    return (
        <>
            <div className='flex justify-between mx-2 md:mx-5 p-2 md:p-3'>
                <Link to="/users" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                </Link>
            </div>
            <section className="p-5 md:p-10 bg-white-300 font-sans bg-gray-50" style={{ minHeight: "100vh" }}>
                <div className="container w-full md:w-1/2 lg:w-1/3 mx-auto shadow-xl shadow-gray-400 rounded-lg border bg-gray-100">
                    <h1 className="text-center text-4xl md:text-5xl text-gray-800 font-semibold pt-5">Create New User</h1>

                    <form onSubmit={formik.handleSubmit} className="p-5">
                        <div className="my-5">
                            <label htmlFor="name" className="w-full text-lg text-gray-600 font-semibold">Name</label>
                            <input
                                type="name"
                                id="name"
                                name='name'
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                placeholder="Enter Your Name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                            />

                            {/* display error message if name is invalid */}
                            {
                                formik.errors.name && formik.touched.name &&
                                <div className='text-red-500 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                    <span className='my-auto ms-1'>{formik.errors.name}</span>
                                </div>
                            }
                        </div>
                        <div className="my-5">
                            <label htmlFor="email" className="w-full text-lg text-gray-600 font-semibold">Email</label>
                            <input
                                type="email"
                                id="email"
                                name='email'
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                placeholder="Enter Your Email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                            />

                            {/* display error message if email is invalid */}
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

                        <div className="my-5">
                            <label htmlFor="password" className="w-full text-lg text-gray-600 font-semibold">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                placeholder="Enter Your Password"
                                name='password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                            />
                            {/* display error message if password is invalid */}
                            {
                                formik.errors.password && formik.touched.password &&
                                <div className='text-red-500 text-sm'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                    </span>
                                    <span className='my-auto ms-1'>{formik.errors.password}</span>
                                </div>
                            }
                        </div>
                        {/* dropdown for role */}
                        <div className="my-5">
                            <label htmlFor="role" className="w-full text-lg text-gray-600 font-semibold">Role</label>
                            <select
                                id="role"
                                name="role"
                                className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                                onChange={formik.handleChange}
                                value={formik.values.role}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>


                            {/* display error message if role is invalid */}
                            {
                                formik.errors.role && formik.touched.role &&
                                <div className='text-red-500 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                    <span className='my-auto ms-1'>{formik.errors.role}</span>
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
        </>
    )
}

export default NewUser
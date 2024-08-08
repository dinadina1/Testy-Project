import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { loginUser } from '../../../actions/authActions';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { clearAuthError } from '../../../slices/authSlice';
import Alert from '../../layout/Alert';
// import {useHistory} from 'react-router'

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
    return errors;
}

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [showAlert, setShowAlert] = useState(true);

    const { isAuthenticated, error } = useSelector(state => state.authState);

    const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

    useEffect(() => {

        if (isAuthenticated) {
            navigate(redirect)
        }
        if (error) {
            toast(error, {
                type: "error",
                position: 'bottom-right',
                onOpen: () => { dispatch(clearAuthError()) }
            })
        }
    }, [isAuthenticated, error, dispatch, navigate])

    // Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            dispatch(loginUser(values));
        }
    });

    const handleAlertClose = () => {
        setShowAlert(false);
      };
  

    return (
        <>
            {/* alert section */}
            {showAlert && (
                <Alert onClose={handleAlertClose} />
            )}

        
            <section className="p-5 md:p-10 bg-white-300 font-sans bg-gray-50" style={{ minHeight: "100vh" }}>
                <div className="container w-full md:w-1/2 lg:w-1/3 mx-auto shadow-xl shadow-gray-400 rounded-lg border bg-gray-100">
                    <h1 className="text-center text-4xl md:text-5xl text-gray-800 font-semibold pt-5">Login</h1>

                    <form onSubmit={formik.handleSubmit} className="p-5">
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

                        <div className="text-end me-2">
                            <Link to={"/password/forgot"} className="text-md text-blue-600 font-semibold hover:underline">forgot password</Link>
                        </div>
                        <div className="text-center py-2 my-4">
                            <button type="submit" onClick={formik.handleSubmit}
                                className="border-2 w-full py-4 rounded-full bg-blue-600 text-white font-bold">Login</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login
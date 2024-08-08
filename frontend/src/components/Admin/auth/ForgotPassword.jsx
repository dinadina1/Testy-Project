import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../actions/authActions';
import { clearAuthError, clearIsMailSent } from '../../../slices/authSlice';

const validate = values => {
    const errors = {};
    // check if email is valid
    if (!values.email) {
        errors.email = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
}

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const { isMailSent , error, loading} = useSelector(state => state.authState);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: values => {
            dispatch(forgotPassword(values));            
        }
    })

    useEffect(() => {
        if (isMailSent) {
            toast('Email Sent Successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearIsMailSent())
            })
            formik.resetForm();
            
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearAuthError())
            })
        }
    }, [isMailSent, error])

  return (
    <>
    <section className="p-5 md:p-10 bg-white-300 font-sans bg-gray-50" style={{minHeight:"100vh"}}>
        <div className="container w-full md:w-1/2 lg:w-1/3 mx-auto shadow-xl shadow-gray-400 rounded-lg border bg-gray-100">
            <h1 className="text-center text-3xl md:text-4xl text-gray-800 font-semibold pt-5">Forgot Password</h1>

            <form className="p-5" onSubmit={formik.handleSubmit}>
                <div className="my-5">
                    <label htmlFor="email" className="w-full text-lg text-gray-600 font-semibold">Email</label>
                    <input type="email" id="email"
                        className="text-md w-full p-2 border-b-2 rounded border-gray-400 bg-gray-100 outline-none focus:border-t-transparent focus:border-gray-600"
                        placeholder="Enter Your Email"
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />

                        {/* display error if email is invalid */}
                        {
                            formik.errors.email && formik.touched.email &&
                            <div className='text-red-500 text-sm'>{formik.errors.email}</div>
                        }
                </div>
                <div className="text-center py-2 my-4">
                    <button type="submit" disabled={loading} onClick={formik.handleSubmit}
                        className="border-2 w-full py-4 rounded-full bg-blue-600 text-white font-bold">Send
                        Email</button>
                </div>
            </form>
        </div>
    </section>
    </>
  )
}

export default ForgotPassword
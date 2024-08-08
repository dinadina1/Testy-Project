import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, clearIsPasswordReseted } from '../../../slices/authSlice';
import { resetPassword } from '../../../actions/authActions';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Password is Required';
    } else if(values.password.length < 6){
        errors.password = 'Password must be atleast 6 characters'
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is Required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Password does not match';
    }
    return errors;
}

const ResetPassword = () => {

    const dispatch = useDispatch();
    const {token} = useParams();
    const navigate = useNavigate();
    const { isPasswordReseted , error, loading=false} = useSelector(state => state.authState);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: values => {
            dispatch(resetPassword(token, values));
        }
    })

    useEffect(() => {
        if (isPasswordReseted) {
            toast('Password Reset Successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearIsPasswordReseted())
            })
            formik.resetForm();
            navigate('/login');
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearAuthError())
            })
        }
    }, [isPasswordReseted, error])

  return (
    <>
    <section className="p-5 md:p-10 bg-white-300 font-sans bg-gray-50" style={{minHeight:"100vh"}}>
        <div className="container w-full md:w-1/2 lg:w-1/3 mx-auto shadow-xl shadow-gray-400 rounded-lg border bg-gray-100">
            <h1 className="text-center text-3xl md:text-4xl text-gray-800 font-semibold pt-5">Reset Password</h1>
            <form className="p-5" onClick={formik.handleSubmit}>

                <div className="my-5">
                    <label htmlFor="password" className="w-full text-lg text-gray-600 font-semibold">New Password</label>
                    <input type="password" id="password"
                        className="text-md w-full p-2 border-b-2 rounded border-b-gray-400 bg-gray-100 outline-none focus:border-gray-600 focus:border-t-transparent"
                        placeholder="Enter Your Password"
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                        {/* display message if password is invalid */}
                        {
                            formik.errors.password && formik.touched.password &&
                            <div className='text-red-500 text-sm'>{formik.errors.password}</div>
                        }
                </div>
                <div className="my-5">
                    <label htmlFor="confirmPassword" className="w-full text-lg text-gray-600 font-semibold">Confirm
                        Password</label>
                    <input type="password" id="confirmPassword"
                        className="text-md w-full p-2 border-b-2 rounded border-b-gray-400 bg-gray-100 outline-none focus:border-gray-600 focus:border-t-transparent"
                        placeholder="Enter Your confirmPassword"
                        name='confirmPassword'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                        {/* display message if confirm password is invalid */}
                        {
                            formik.errors.confirmPassword && formik.touched.confirmPassword &&
                            <div className='text-red-500 text-sm'>{formik.errors.confirmPassword}</div>
                        }
                </div>
                <div className="text-center py-2 my-4">
                    <button type="submit" onClick={formik.handleSubmit} disabled={loading}
                        className="border-2 w-full py-4 rounded-full bg-blue-600 text-white font-bold">Reset</button>
                </div>
            </form>
        </div>
    </section>
    </>
  )
}

export default ResetPassword
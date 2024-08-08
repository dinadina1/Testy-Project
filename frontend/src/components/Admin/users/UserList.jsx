import { toast } from 'react-toastify'
import React, { useEffect } from 'react'
import Sidebar from '../../layout/Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../layout/Loader'
import { deleteAuthUser, getAllAuthUsers } from '../../../actions/authActions'
import { clearAuthError, clearIsUserDeleted } from '../../../slices/authSlice'

const UserList = () => {
    
    const dispatch = useDispatch();
    const { users = [], loading = true, isDeleted, error } = useSelector(state => state.authState)

    useEffect(() => {
            dispatch(getAllAuthUsers);
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteAuthUser(id))
    }

    useEffect(() => {
        if (isDeleted) {
            toast("User deleted successfully", {
                type: "success",
                position: 'bottom-center',
            });
            dispatch(clearIsUserDeleted());
            dispatch(getAllAuthUsers());
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearAuthError())
            });
        }
    }, [isDeleted, error, dispatch])

    return (
        <>
            {
                loading ? (
                    <div className='flex justify-center mt-10'>
                        <Loader />
                    </div>
                ) : (
                    <div className="flex flex-row ">
                        <Sidebar />
                        <div className="w-full md:w-5/6 ">
                            <div className="flex mx-auto justify-between p-4">
                                <h1 className="text-2xl md:text-4xl font-bold ps-6 md:ps-8 my-auto">User List</h1>
                                <Link to={"/user/new"} id=" me-10"
                                    className="px-3 md:px-6 flex bg-blue-600 text-white text-sm md:text-lg font-semibold rounded-3xl active:bg-blue-500"
                                    type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                        stroke="currentColor" className="size-6 my-auto mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <span className="my-auto ms-2 mx-auto">New</span>
                                </Link>
                            </div>

                            <div className="container ">
                                <div className="overflow-x-auto shadow-md mx-5">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {users.map((user, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {user.username}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button onClick={() => handleDelete(user._id)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UserList

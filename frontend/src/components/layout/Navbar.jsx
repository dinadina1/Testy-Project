import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { logoutUser } from '../../actions/authActions';
import Profile from '../Admin/users/Profile';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user = {}, isAuthenticated } = useSelector(state => state.authState);
    const { isAuthUser } = useSelector(state => state.userState);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // function to handle dropdown toggle
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setTimeout(() => {
            setIsDropdownOpen(false)
        }, 5000);
    };

    // function to handle menu toggle
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // function to handle logout
    const handleLogout = () => {
        dispatch(logoutUser);
        setIsDropdownOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    
    return (
        <>
            <nav className={isAuthUser ? "bg-gray-100 hidden shadow-md sticky top-0 z-50" : "bg-gray-100 shadow-md sticky top-0 z-50"}>
                <div className="flex flex-row justify-between border bg-gray-100 w-full p-2">
                    <div className="flex items-center ms-5">
                        <Link to="/">
                            <img src="/images/logo.png" className="rounded h-10 md:w-20" alt="Logo" />
                        </Link>
                        <p className="text-sm md:text-xl font-semibold ms-3 md:ms-10">Testy</p>
                    </div>
                    <div onClick={handleMenuToggle} className={isAuthenticated ? "md:hidden cursor-pointer my-auto ms-10" : "hidden md:hidden cursor-pointer my-auto ms-10"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>
                    </div>
                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <>
                                <div
                                    onClick={handleDropdownToggle}
                                    className='flex items-center cursor-pointer me-5'>
                                    <span className='text-lg font-semibold'>{user?.username}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ms-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </>
                        ) : (
                            <Link to="/login" className='bg-blue-600 py-2 px-5 rounded-md text-white font-semibold'>
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {isMenuOpen && (
                    <ul className="md:hidden px-10 py-2 border-b-2">
                        <li><Link to="/" className="text-md font-semibold my-1 block">Dashboard</Link></li>
                        <li><Link to="/tests" className="text-md font-semibold my-1 block">Tests</Link></li>
                        <li><Link to="/questions" className="text-md font-semibold my-1 block">Questions</Link></li>
                        <li><Link to="/users" className="text-md font-semibold my-1 block">Users</Link></li>
                    </ul>
                )}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 me-5 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                        <button onClick={openModal} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</button>
                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-red-700 hover:bg-gray-100">Logout</button>
                    </div>
                )}
                <Profile
                    user={user}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            </nav>
        </>
    );
};

export default Navbar;

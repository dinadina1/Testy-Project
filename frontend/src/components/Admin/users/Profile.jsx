import React from 'react';

const Profile = ({ user, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                    <button
                        className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <div className="flex flex-col items-center">
                        {/* Profile Picture */}
                        <div className="mb-4">
                            <img
                                src="/images/default_avatar.png"
                                alt={`${user.username}'s profile`}
                                className="w-24 h-24 rounded-full border-2 border-gray-200"
                            />
                        </div>
                        {/* User Information */}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
                            <p className="text-gray-600 mb-4">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

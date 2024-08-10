import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../user/Modal'
import { useNavigate, useParams } from 'react-router-dom'
import { createUserResponse, submitResponse } from '../../actions/userActions'
import { toast } from 'react-toastify'
import { clearUserResponseError } from '../../slices/userSlice'

const UserNav = () => {
    const { testId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { test = {}, user = {}, loading, error, isTestSubmitted = false } = useSelector(state => state.userState);

    // useEffect for running timer
    useEffect(() => {
        let timer = parseInt(test.duration) * 60;
        const interval = setInterval(() => {
            let hours = Math.floor(timer / 3600);
            let minutes = Math.floor((timer % 3600) / 60);
            let seconds = timer % 60;

            // Format hours, minutes, and seconds
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            let displayTimer = document.getElementById('timer');
            if (displayTimer) {
                displayTimer.textContent = `${hours}:${minutes}:${seconds}`;

                timer--;
                if (timer < 0) {
                    // Clear interval
                    clearInterval(interval);

                    // Submit response
                    const response = sessionStorage.getItem('responseData') ? JSON.parse(sessionStorage.getItem('responseData')) : [];
                    const formData = {
                        testId: testId,
                        userId: user?._id,
                        responses: [...response]
                    };
                    dispatch(createUserResponse(formData, testId));
                    dispatch(submitResponse(testId));
                    sessionStorage.removeItem('responseData');
                    sessionStorage.removeItem('userInfo');
                    sessionStorage.removeItem('isTestLoaded');
                }
            }
        }, 1000);

        return () => clearInterval(interval); // Clean up on unmount
    }, [dispatch, test.duration, testId, user?._id]);

    // Function to submit test
    const submitResponses = () => {
        const response = sessionStorage.getItem('responseData') ? JSON.parse(sessionStorage.getItem('responseData')) : [];
        const formData = {
            testId: testId,
            userId: user._id,
            responses: [...response]
        };

        dispatch(createUserResponse(formData, testId));
        dispatch(submitResponse(testId));
        sessionStorage.removeItem('responseData');
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('isTestLoaded');
    }

    // Display toast and handle navigation
    useEffect(() => {
        if (isTestSubmitted) {
            sessionStorage.removeItem('isTestLoaded');
            sessionStorage.removeItem('responseData');
            sessionStorage.removeItem('userInfo');
            navigate('/test/submit');
        }
    }, [isTestSubmitted, dispatch, navigate]);

    // Toggle modal
    const toggleModal = () => {
        const openModalButton = document.getElementById('open-modal-button');
        const modalBackdrop = document.getElementById('modal-backdrop');
        const cancelButton = document.getElementById('cancel-button');
        const confirmButton = document.getElementById('confirm-button');

        if (openModalButton && modalBackdrop && cancelButton && confirmButton) {
            openModalButton.addEventListener('click', () => {
                modalBackdrop.classList.remove('hidden');
                modalBackdrop.classList.add('flex');
            });

            cancelButton.addEventListener('click', () => {
                modalBackdrop.classList.add('hidden');
            });

            confirmButton.addEventListener('click', () => {
                modalBackdrop.classList.add('hidden');
            });
        }
    }

    useEffect(() => {
        toggleModal();
    }, []);

    

    return (
        <>
            <nav className="flex flex-row justify-between border bg-gray-100 w-full">
                <div className="flex md:ms-5 p-2 md:p-2">
                    <img src="./images/logo.png" className="rounded my-auto h-10 md:w-20" alt="Logo" />
                    <p className="text-sm md:text-xl font-semibold ms-3 md:ms-10 my-auto">{test.title}</p>
                </div>
                <div className="flex md:me-5 p-2">
                    <p id='timer' className="me-4 md:me-10 md:text-2xl font-bold my-auto">00:00:00</p>
                    <button onClick={toggleModal} id="open-modal-button" className="px-3 md:px-10 py-2 bg-blue-600 text-white text-sm md:text-lg font-semibold rounded-xl active:bg-blue-500">Submit</button>
                </div>
            </nav>

            <Modal submitResponses={submitResponses} />

           
        </>
    )
}

export default UserNav;

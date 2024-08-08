import React, { useEffect, useState } from "react";
import UserNav from "../layout/UserNav";
import { useDispatch, useSelector } from "react-redux";
import {
    createUserResponse,
    getQuestion,
    getUserResponse,
    getUserTest,
} from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import { clearIsAuthUser, clearUserResponseError } from "../../slices/userSlice";

const TestPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { testId } = useParams();

    const {
        test = {},
        user = {},
        userResponse = [],
        question = {},
        loading,
        error,
        currentPage = 1,
    } = useSelector((state) => state.userState);

    const [selectedOptions, setSelectedOptions] = useState([
        false,
        false,
        false,
        false,
    ]);
    const [selectedOptionText, setSelectedOptionText] = useState(null);

    const selectedQuestionsCount = sessionStorage.getItem('responseData') ? JSON.parse(sessionStorage.getItem('responseData')).length : 0;
    const totalQuestionsCount = test.questions?.length;
    const pendingQuestionsCount = totalQuestionsCount - selectedQuestionsCount;

    // useEffect for get first question when first loaded
    useEffect(() => {
        if (!sessionStorage.getItem("isTestLoaded")) {
            dispatch(getUserTest(testId));
            dispatch(getQuestion(testId, 1));
            sessionStorage.setItem("isTestLoaded", true);
        }
    }, [dispatch, testId]);

    useEffect(() => {
        if (error) {
            toast(error, {
                type: "error",
                position: "top-right",
                onOpen: () => {
                    dispatch(clearUserResponseError())
                    dispatch(clearIsAuthUser())
                    sessionStorage.removeItem('isTestLoaded');
                }
            })
            return navigate(`/instruction/${testId}`);
        }
    }, [error, dispatch])

    // useEffect for assigning selected options
    useEffect(() => {
        let oldOptions = JSON.parse(sessionStorage.getItem("responseData"));
        oldOptions = oldOptions?.find(
            (response) => response.questionId == question._id
        );
        if (oldOptions) {
            setSelectedOptions(oldOptions.selectedOption);
            setSelectedOptionText(oldOptions.selectedOptionText);
        } else {
            setSelectedOptions([false, false, false, false]);
            setSelectedOptionText(null);
        }
    }, [question]);

    // function to handle next button
    const handleNext = () => {
        dispatch(getQuestion(testId, parseInt(currentPage) + 1));
    };

    // function to handle previous button
    const handlePrev = () => {
        if (parseInt(currentPage) > 1) {
            dispatch(getQuestion(testId, parseInt(currentPage) - 1));
        }
    };

    // function to handle option selection
    const changeSelectedOptions = (index, optionText) => {
        const option = selectedOptions?.map((opt, idx) => idx == index);
        setSelectedOptions(option);
        const formData = {
            questionId: question._id,
            selectedOption: option,
            selectedOptionText: optionText
        };

        const responseData =
            JSON.parse(sessionStorage.getItem("responseData")) || [];
        const newResponseData = responseData.map((response) => {
            if (response.questionId === question._id) {
                return formData;
            }
            return response;
        });

        if (
            !newResponseData.find((response) => response.questionId === question._id)
        ) {
            newResponseData.push(formData);
        }

        sessionStorage.setItem("responseData", JSON.stringify(newResponseData));
    };


    return (
        <>
            <UserNav />
            {loading ? (
                <div className="flex justify-center mt-10">
                    <Loader />
                </div>
            ) : (
                <>
                    <div className="flex" style={{ height: "88vh" }}>
                        <div
                            className="w-full md:w-3/4 relative border-r-2"
                            style={{ height: "80vh" }}
                        >
                            <div className="flex justify-between px-3 md:px-5 py-2">
                                <h2 className="text-xl md:text-2xl my-auto font-bold md:ms-10 border-2 border-gray-300 rounded-full px-2 bg-gray-200">
                                    {currentPage}
                                </h2>
                                <p className="text-lg font-semibold">
                                    Total Questions: {totalQuestionsCount}
                                </p>
                                <span className="block md:hidden">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6 my-auto text-blue-800"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        />
                                    </svg>
                                </span>
                            </div>

                            <p className="p-2 ms-2 md:ms-10 font-semibold text-lg">
                                {question.questionText}
                            </p>
                            <article className="overflow-auto h-52 md:h-64">
                                {question?.options?.length > 0 &&
                                    question.options.map((option, index) => (
                                        <div key={index} className="flex ps-5 md:ps-12 py-3">
                                            <input
                                                checked={selectedOptionText === option.optionText}
                                                onChange={(e) => {
                                                    setSelectedOptionText(e.target.value);
                                                    changeSelectedOptions(index, e.target.value);
                                                }}
                                                id={`${option.optionText}-${index}`}
                                                name="option"
                                                value={option.optionText}
                                                type="radio"
                                                className="me-3"
                                            />
                                            <label htmlFor={`${option.optionText}-${index}`}>
                                                {option.optionText}
                                            </label>
                                        </div>
                                    ))}
                            </article>
                            <div className="flex justify-between px-5 md:px-11 mt-5">
                                <button
                                    disabled={parseInt(currentPage) === 1}
                                    onClick={handlePrev}
                                    className="absolute bottom-0 left-4 md:left-12 py-2 px-7 md:py-3 md:px-10 font-semibold border bg-blue-600 rounded-3xl text-white disabled:bg-blue-400"
                                >
                                    Prev
                                </button>
                                <button
                                    disabled={test?.questions?.length < parseInt(currentPage) + 1}
                                    onClick={handleNext}
                                    className="absolute bottom-0 right-4 md:right-12 py-2 px-7 md:py-3 md:px-10 font-semibold border bg-blue-600 rounded-3xl text-white disabled:bg-blue-400"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        <div id="menuItem" className="hidden lg:flex md:w-1/4 flex-col">
                            <div className="h-2/5 p-4">
                                <div className="h-full grid grid-cols-4 gap-y-3 p-2 border-2 rounded-xl bg-gray-100 overflow-auto pb-3 shadow-lg shadow-gray-300">
                                    {test?.questions?.length > 0 &&
                                        test.questions.map((question, index) => (
                                            <p
                                                key={index + 1}
                                                onClick={() => dispatch(getQuestion(testId, index + 1))}
                                                className={
                                                    JSON.parse(sessionStorage.getItem("responseData"))?.find((response) => response.questionId == question._id) && currentPage != index + 1
                                                        ? "text-xl font-semibold mx-3 border-2 border-gray-300 rounded-full bg-blue-400 text-center px-2"
                                                        : currentPage == index + 1
                                                            ? "text-xl font-semibold mx-3 border-2 border-gray-300 rounded-full bg-green-500 text-center px-2"
                                                            : "text-xl font-semibold mx-3 border-2 border-gray-300 rounded-full bg-gray-300 text-center px-2"
                                                }
                                            >
                                                <span>{index + 1}</span>
                                            </p>
                                        ))}


                                </div>
                            </div>

                            <div className="h-3/5 mt-3 flex flex-col gap-y-2">
                                <div className="flex justify-between mx-10 p-5 rounded bg-blue-400 border shadow-lg shadow-gray-300">
                                    <h4 className="text-lg font-bold">Selected Questions</h4>
                                    <h5 className="text-xl font-bold">{selectedQuestionsCount}</h5>
                                </div>
                                <div className="flex justify-between mx-10 p-5 rounded bg-gray-300 border shadow-lg shadow-gray-400">
                                    <h4 className="text-lg font-bold">Pending Questions</h4>
                                    <h5 className="text-xl font-bold">{pendingQuestionsCount}</h5>
                                </div>
                            </div>
                        </div>
                    </div>


                </>
            )}
        </>
    );
};

export default TestPage;

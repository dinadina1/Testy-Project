import axios from "axios";
import { createUserResponseFail, createUserResponseRequest, createUserResponseSuccess, getQuestionFail, getQuestionRequest, getQuestionSuccess, getTestFail, getTestRequest, getTestSuccess, getUserResponseFail, getUserResponseRequest, getUserResponseSuccess, loadTestUserFail, loadTestUserRequest, loadTestUserSuccess, registerUserFail, registerUserRequest, registerUserSuccess, submitTestFail, submitTestRequest, submitTestSuccess } from "../slices/userSlice"


// register user action
export const registerUser = (formData) => async (dispatch) => {
    try{
        dispatch(registerUserRequest());
        const {data} = await axios.post('/api/v1/user/new', formData);
        dispatch(registerUserSuccess(data.user));
    } catch (error) {
        dispatch(registerUserFail(error.response.data.message));
    }
};

// get test
export const getUserTest = (testId) => async (dispatch) => {
    try{
        dispatch(getTestRequest())
        const {data} = await axios.get(`/api/v1/test/${testId}`);
        dispatch(getTestSuccess(data.test));
    } catch (error) {
        dispatch(getTestFail(error?.response?.data?.message));
    }
}

export const getQuestion = (testId, page) => async (dispatch) => {
    try{
        dispatch(getQuestionRequest())
        const {data} = await axios.get(`/api/v1/question/${testId}?page=${page}`);
        dispatch(getQuestionSuccess(data));
    } catch (error) {
        dispatch(getQuestionFail(error?.response?.data?.message));
    }
}

// get testUser action
export const getTestUser = async (dispatch) => {
    try{
        dispatch(loadTestUserRequest());
        const {data} = await axios.get('/api/v1/user/me');
        dispatch(loadTestUserSuccess(data.user));
    } catch (error) {
        dispatch(loadTestUserFail(error?.response?.data?.message));
    }
}

// create user action
export const createUserResponse = (formData, testId) => async (dispatch) => {
    try{
        
        dispatch(createUserResponseRequest());
        const {data} = await axios.post(`/api/v1/user/response/${testId}`, formData);
        dispatch(createUserResponseSuccess(data.user));
    } catch (error) {
        dispatch(createUserResponseFail(error?.response?.data?.message));
    }
}

// get user response
export const getUserResponse = (testId, userId) => async (dispatch) => {
    try{
        dispatch(getUserResponseRequest());
        const {data} = await axios.get(`/api/v1/user/response/${testId}`, {
            userId: userId
        });
        dispatch(getUserResponseSuccess(data.response.responses))
        
    } catch (error) {
        dispatch(getUserResponseFail(error.response.data.message));
    }
}

// submit response
export const submitResponse = (testId) => async (dispatch) => {
    try{
        dispatch(submitTestRequest());
        await axios.get(`/api/v1/user/submit/${testId}`);
        dispatch(submitTestSuccess());
    } catch (error) {
        dispatch(submitTestFail(error.response.data.message))
    }
}

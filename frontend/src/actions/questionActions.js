import axios from "axios";
import {
    deleteQuestionFail,
    deleteQuestionRequest,
    deleteQuestionSuccess,
    newQuestionFail,
    newQuestionRequest,
    newQuestionSuccess,
    newQuestionsFail,
    newQuestionsRequest,
    newQuestionsSuccess,
    questionFail,
    questionRequest,
    questionSuccess,
    questionsFail,
    questionsRequest,
    questionsSuccess,
    updateQuestionFail,
    updateQuestionRequest,
    updateQuestionSuccess
} from '../slices/questionSlice';

// get all test action
export const getAllQuestions = async (dispatch) => {
    try{
        dispatch(questionsRequest());
        const {data} = await axios.get('/api/v1/question/admin/all');
        dispatch(questionsSuccess(data.questions));
    } catch (error) {
        dispatch(questionsFail(error.response.data.message));
    }
}

// get questions for particular test
export const getQuestionsParticularTest = (testId) => async (dispatch) => {
    try{
        dispatch(questionsRequest());
        const {data} = await axios.get(`/api/v1/question/admin/all?testId=${testId}`);
        dispatch(questionsSuccess(data.questions));
    } catch (error) {
        dispatch(questionsFail(error.response.data.message));
    }
}

// get question by id
export const getQuestionById = (questionId) => async (dispatch) => {
    try{
        dispatch(questionRequest());
        const {data} = await axios.get(`/api/v1/question/admin/single/${questionId}`);
        dispatch(questionSuccess(data.question));
    } catch (error) {
        dispatch(questionFail(error.response.data.message));
    }
}

// delete question
export const deleteQuestion = (questionId) => async (dispatch) => {
    try{
        dispatch(deleteQuestionRequest());
        await axios.delete(`/api/v1/question/admin/${questionId}`);
        dispatch(deleteQuestionSuccess());
    } catch (error) {
        dispatch(deleteQuestionFail(error.response.data.message));
    }
}

// new question action
export const newQuestion = (testId, formData) => async (dispatch) => {
    try{
        dispatch(newQuestionRequest());
        const {data} = await axios.post(`/api/v1/question/admin/new/${testId}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(newQuestionSuccess(data.question));
    } catch (error) {
        dispatch(newQuestionFail(error.response.data.message));
    }
}

// new questions action
export const newQuestions = (testId, formData) => async (dispatch) => {
    try{
        dispatch(newQuestionsRequest());
        const {data} = await axios.post(`/api/v1/question/admin/newquestions/${testId}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(newQuestionsSuccess(data.questions));
    } catch (error) {
        dispatch(newQuestionsFail(error.response.data.message));
    }
}

// update question
export const updateQuestion = (questionId, formData) => async (dispatch) => {
    try{
        dispatch(updateQuestionRequest());
        const {data} = await axios.put(`/api/v1/question/admin/${questionId}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(updateQuestionSuccess());
    } catch (error) {
        dispatch(updateQuestionFail(error.response.data.message));
    }
}


import { createSlice } from "@reduxjs/toolkit";

// create test slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        isAuthUser: sessionStorage.getItem('userInfo') ? true : false,
        question: {},
        test: {},
        currentPage: 1,
        userResponse:[],
        isTestSubmitted: false
        // user: {},
        // isAuthUser: false,
    },
    reducers: {
        registerUserRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        registerUserSuccess: (state, action) => {
            sessionStorage.setItem('userInfo',JSON.stringify(action.payload))
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthUser: true,                
            }
        },
        registerUserFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthUser: false
            }
        },
        getQuestionRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        getQuestionSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                question: action.payload.question[0],
                currentPage: action.payload.currentPage
            }
        },
        getQuestionFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getTestRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        getTestSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                test: action.payload
            }
        },
        getTestFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadTestUserRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        loadTestUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthUser: true
            }
        },
        loadTestUserFail: (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthUser: false
            }
        },
        createUserResponseRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        createUserResponseSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        },
        createUserResponseFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getUserResponseRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        getUserResponseSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                userResponse: action.payload
            }
        },
        getUserResponseFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        submitTestRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        submitTestSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                response: action.payload,
                isTestSubmitted: true
            }
        },
        submitTestFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isTestSubmitted: false
            }
        },
        clearUserResponseError: (state, action) => {
            return {
                ...state,
                error: null
            }
        },
        clearIsAuthUser: (state, action) => {
            return {
                ...state,
                isAuthUser: false
            }
        },
        

    }
})

// destructuring test slice
const { reducer, actions } = userSlice;

// export action
export const {
    registerUserFail,
    registerUserRequest,
    registerUserSuccess,
    getQuestionFail,
    getQuestionRequest,
    getQuestionSuccess,
    getTestFail,
    getTestRequest,
    getTestSuccess,
    loadTestUserFail,
    loadTestUserRequest,
    loadTestUserSuccess,
    createUserResponseFail,
    createUserResponseRequest,
    createUserResponseSuccess,
    getUserResponseFail,
    getUserResponseRequest,
    getUserResponseSuccess,
    submitTestFail,
    submitTestRequest,
    submitTestSuccess,
    clearUserResponseError,
    clearIsAuthUser
   } = actions;

// export reducer
export default reducer;
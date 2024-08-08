// import required modules
import {createSlice} from '@reduxjs/toolkit'

// create question slice
const questionSlice = createSlice({
    name: 'question',
    initialState: {
        questions: [],
        loading: false,
        question: {},
        error: null,
        isDeleted: false,
        isCreated: false,
        isUpdated: false
    },
    reducers: {
        questionsRequest: (state, action) => {
            return {
                ...state,
                loading: true            
            }
        },
        questionsSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                questions: action.payload
            }
        },
        questionsFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearQuestionError: (state, action) => {
            return {
                ...state,
                error: null
            }
        },
        questionRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        questionSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                question: action.payload
            }
        },
        questionFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteQuestionRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        deleteQuestionSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                isDeleted: true
            }
        },
        deleteQuestionFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearIsQuestionDeleted: (state, action) => {
            return {
                ...state,
                isDeleted: false
            }
        },
        newQuestionRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        newQuestionSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                question: action.payload,
                isCreated: true
            }
        },
        newQuestionFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearIsQuestionCreated: (state, action) => {
            return {
                ...state,
                isCreated: false
            }
        },
        newQuestionsRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        newQuestionsSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                questions: action.payload,
                isCreated: true
            }
        },
        newQuestionsFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateQuestionRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        updateQuestionSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                isUpdated: true
            }
        },
        updateQuestionFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearIsQuestionUpdated: (state, action) => {
            return {
                ...state,
                isUpdated: false
            }
        }
        
    }
});

// destructuring authslice
const {reducer, actions} = questionSlice;

// export action
export const {
    questionsRequest,
    questionsSuccess,
    questionsFail,
    clearQuestionError,
    questionFail,
    questionRequest,
    questionSuccess,
    deleteQuestionFail,
    deleteQuestionRequest,
    deleteQuestionSuccess,
    clearIsQuestionDeleted,
    newQuestionFail,
    newQuestionRequest,
    newQuestionSuccess,
    clearIsQuestionCreated,
    newQuestionsFail,
    newQuestionsRequest,
    newQuestionsSuccess,
    updateQuestionFail,
    updateQuestionRequest,
    updateQuestionSuccess,
    clearIsQuestionUpdated
    

} = actions;

// export reducer
export default reducer;
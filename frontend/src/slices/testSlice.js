import { createSlice } from "@reduxjs/toolkit";

// create test slice
const testSlice = createSlice({
    name: 'test',
    initialState: {
        loading: false,
        tests: [],
        test: {},
        error: null,
        isDeleted: false,
        totalPagePagination: 0,
        isUpdated: false,
        isTestCreated: false
    },
    reducers: {
        testsRequest: (state, action) => {
            return {
                ...state,
                loading: true,
                isDeleted: false          
            }
        },
        testsSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                tests: action.payload.tests,
                totalPagePagination: action.payload.totPages,
                isDeleted: false
            }
        },
        testsFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isDeleted: false
            }
        },
        clearTestError: (state, action) => {
            return {
                ...state,
                error: null
            }
        },
        deleteTestRequest: (state, action) => {
            return {
                ...state,
                loading: true,
                isDeleted: false
            }
        },
        deleteTestSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                isDeleted: true
            }
        },
        deleteTestFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isDeleted: false
            }
        },
        clearIsTestDeleted: (state, action) => {
            return {
                ...state,
                isDeleted: false
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
        updateTestRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        updateTestSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                isUpdated: true
            }
        },
        updateTestFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearIsTestUpdated: (state, action) => {
            return {
                ...state,
                isUpdated: false
            }
        },
        newTestRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        newTestSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                test: action.payload,
                isTestCreated: true
            }
        },
        newTestFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearIsTestCreated: (state, action) => {
            return {
                ...state,
                isTestCreated: false
            }
        }
        
    }
})

// destructuring test slice
const { reducer, actions } = testSlice;

// export action
export const {
    testsRequest,
    testsSuccess,
    testsFail,
    clearTestError,
    deleteTestFail,
    deleteTestRequest,
    deleteTestSuccess,
    clearIsTestDeleted,
    getTestFail,
    getTestRequest,
    getTestSuccess,
    updateTestFail,
    updateTestRequest,
    updateTestSuccess,
    clearIsTestUpdated,
    newTestFail,
    newTestRequest,
    newTestSuccess,
    clearIsTestCreated
    
} = actions;

// export reducer
export default reducer;
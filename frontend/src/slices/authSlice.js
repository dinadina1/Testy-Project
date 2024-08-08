// import required modules
import {createSlice} from '@reduxjs/toolkit'

// create auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        users: [],
        loading: false,
        isAuthenticated: !!localStorage.getItem('token'),
        error: null,
        isDeleted: false,
        isCreated: false,
        isUpdated: false,
        isMailSent: false,
        isPasswordReseted: false
    },
    reducers: {
        loginRequest: (state, action) => {
            return {
                ...state,
                loading: true            
            }
        },
        loginSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        },
        loginFail: (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        },
        loadUserRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        loadUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        },
        loadUserFail: (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
            }
        },
        clearAuthError: (state, action) => {
            return {
                ...state,
                error: null
            }
        },
        logoutUserRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        logoutUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            }
        },
        logoutUserFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getUsersRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        getUsersSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        },
        getUsersFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUsersError: (state, action) => {
            return {
                ...state,
                error: null
            }
        },
        deleteUserRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        deleteUserFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }, 
        deleteUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                isDeleted: true
            }
        },
        clearIsUserDeleted: (state, action) => {
            return {
                ...state,
                isDeleted: false
            }
        },
        createUserRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        createUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                user: action.payload,
                isCreated: true
            }
        },
        createUserFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isCreated: false
            }
        },
        clearIsUserCreated: (state, action) => {
            return {
                ...state,
                isCreated: false
            }
        },
        getUserRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        getUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        },
        getUserFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateUserRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        updateUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                isUpdated: true
            }
        },
        updateUserFail: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearIsUserUpdated: (state, action) => {
            return {
                ...state,
                isUpdated: false
            }
        },
        forgotPasswordRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        forgotPasswordSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                isMailSent: true
            }
        },
        forgotPasswordFail: (state, action) => {
            return {
                ...state,
                loading: true,
                isMailSent: false,
                error: action.payload
            }
        },
        clearIsMailSent: (state, action) => {
            return {
                ...state,
                isMailSent: false
            }
        },
        resetPasswordRequest: (state, action) => {
            return {
                ...state,
                loading: false
            }
        },
        resetPasswordSuccess: (state, action) => {
            return {
                ...state,
                loading: true,
                isPasswordReseted: true
            }
        },
        resetPasswordFail: (state, action) => {
            return {
                ...state,
                loading: true,
                isPasswordReseted: false,
                error: action.payload
            }
        },
        clearIsPasswordReseted: (state, action) => {
            return {
                ...state,
                isPasswordReseted: false
            }
        }

    }
});

// destructuring authslice
const {reducer, actions} = authSlice;

// export action
export const {
    loginRequest,
    loginSuccess,
    loginFail,
    loadUserFail,
    loadUserRequest,
    loadUserSuccess,
    clearAuthError,
    logoutUserFail,
    logoutUserRequest,
    logoutUserSuccess,
    getUsersRequest,
    getUsersSuccess,
    getUsersFail,
    clearUsersError,
    deleteUserFail,
    deleteUserRequest,
    deleteUserSuccess,
    clearIsUserDeleted,
    createUserFail,
    createUserRequest,
    createUserSuccess,
    clearIsUserCreated,
    getUserFail,
    getUserRequest,
    getUserSuccess,
    updateUserFail,
    updateUserRequest,
    updateUserSuccess,
    clearIsUserUpdated,
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    clearIsMailSent,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    clearIsPasswordReseted

} = actions;

// export reducer
export default reducer;
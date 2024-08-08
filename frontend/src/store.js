// import required packages
import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import authReducer from './slices/authSlice';
import testReducer from './slices/testSlice';
import questionReducer from './slices/questionSlice';
import userReducer from './slices/userSlice';

// create reducer
const reducer = combineReducers({
    authState: authReducer,
    testState: testReducer,
    questionState: questionReducer,
    userState: userReducer
})

// create store
const store = configureStore({
    reducer,    
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})

// export store
export default store;


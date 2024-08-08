import {
  loginRequest,
  loginSuccess,
  loginFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFail,
  getUsersRequest,
  getUsersSuccess,
  getUsersFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  createUserRequest,
  createUserSuccess,
  createUserFail,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} from "../slices/authSlice";
import axios from "axios";

// Auth actions
// login user action
export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post("/api/v1/auth/admin/login", formData);
    dispatch(loginSuccess(data.user));

    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

// Load user action
export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get("/api/v1/auth/admin/myprofile");
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// Logout action
export const logoutUser = async (dispatch) => {
  try {
    dispatch(logoutUserRequest());
    await axios.get("/api/v1/auth/admin/logout");
    dispatch(logoutUserSuccess());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    dispatch(logoutUserFail(error?.response?.data?.message));
  }
};

// get all users
export const getAllAuthUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersRequest());
    const { data } = await axios.get("/api/v1/auth/admin/all");
    dispatch(getUsersSuccess(data.users));
  } catch (error) {
    dispatch(getUsersFail(error.response.data.message));
  }
};

// delete auth user
export const deleteAuthUser = (userId) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    await axios.delete(`/api/v1/auth/admin/${userId}`);
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};

// create new user
export const createNewUser = (formData) => async (dispatch) => {
  try {
    dispatch(createUserRequest());
    const { data } = await axios.post("/api/v1/auth/admin/new", formData);
    dispatch(createUserSuccess(data.user));
  } catch (error) {
    dispatch(createUserFail(error.response.data.message));
  }
};

// get user details
export const getUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch(getUserRequest());
    const { data } = await axios.get(`/api/v1/auth/admin/user/${userId}`);
    dispatch(getUserSuccess(data.user));
  } catch (error) {
    dispatch(getUserFail(error.response.data.message));
  }
};

// forgot password action
export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    await axios.post("/api/v1/auth/admin/password/forgot", formData);
    dispatch(forgotPasswordSuccess());
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

// reset password action
export const resetPassword = (token, formData) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const { data } = await axios.post(
      `/api/v1/auth/admin/password/reset/${token}`,
      formData
    );
    dispatch(resetPasswordSuccess(data.user));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};

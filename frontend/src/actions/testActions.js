import axios from "axios";
import {
  testsRequest,
  testsSuccess,
  testsFail,
  deleteTestRequest,
  deleteTestSuccess,
  deleteTestFail,
  getTestRequest,
  getTestSuccess,
  getTestFail,
  updateTestRequest,
  updateTestSuccess,
  updateTestFail,
  newTestRequest,
  newTestSuccess,
  newTestFail,
} from "../slices/testSlice";


// get all test action
export const getAllTests = async (dispatch) => {
  try {
    dispatch(testsRequest());
    const { data } = await axios.get("/api/v1/test/admin/all");
    dispatch(testsSuccess(data));
  } catch (error) {
    dispatch(testsFail(error.response.data.message));
  }
};

// delete test action
export const deleteTest = (testId) => async (dispatch) => {
  try {
    dispatch(deleteTestRequest());
    await axios.delete(`/api/v1/test/admin/${testId}`);
    dispatch(deleteTestSuccess());
  } catch (error) {
    dispatch(deleteTestFail(error.response.data.message));
  }
};

// get test for pagination
export const getTestsForPagination = (page) => async (dispatch) => {
  try {
    dispatch(testsRequest());
    const { data } = await axios.get(`/api/v1/test/admin/all?page=${page}`);
    dispatch(testsSuccess(data));
  } catch (error) {
    dispatch(testsFail(error.response.data.message));
  }
};

// get particular test
export const getTest = (testId) => async (dispatch) => {
  try {
    dispatch(getTestRequest());
    const { data } = await axios.get(`/api/v1/test/admin/${testId}`);
    dispatch(getTestSuccess(data.test));
  } catch (error) {
    dispatch(getTestFail(error.response.data.message));
  }
};

// update test
export const updateTest = (testId, formData) => async (dispatch) => {
  try {
    dispatch(updateTestRequest());
    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    // Adding 7 days to the current date
    formData.expiryDate = addDays(Date.now(), 7).toISOString();

    console.log(formData);

    const { data } = await axios.put(`/api/v1/test/admin/${testId}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(updateTestSuccess(data));
  } catch (error) {
    dispatch(updateTestFail(error.response.data.message));
  }
};

// create new test
export const newTest = (formData) => async (dispatch) => {
  try {
    dispatch(newTestRequest());
    const { data } = await axios.post(`/api/v1/test/admin/new`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(newTestSuccess(data.test));
  } catch (error) {
    dispatch(newTestFail(error.response.data.message));
  }
};

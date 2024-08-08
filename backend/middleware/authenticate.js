const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");
const User = require("../models/userModel");
const Test = require("../models/testModel");

// check if authenticate user
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { jwtToken } = req.cookies;

  // return message if token not found
  if (!jwtToken) {
    return next(new ErrorHandler("Login first to handle the resource", 401));
  }

  // verify token
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

  req.user = await Auth.findById(decoded.id);
  next();
});

// check if user is authorize role
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role ${req.user.role} is not allowed`, 401)
      );
    }
    next();
  };
};

// check if test user available in database
exports.authenticateTestUser = catchAsyncError(async (req, res, next) => {
  const { test_user_id } = req.cookies;
  if (!test_user_id) {
    return next(new ErrorHandler("Please give your credential first", 400));
  }
  const user = await User.findById({ _id: test_user_id });
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  req.testUser = user;
  next();
});

// check if user already attended the test
exports.checkTestAttended = catchAsyncError(async (req, res, next) => {
  const testId = req.params.testId || req.params.id;
  console.log(testId);
  const test = await Test.findById({ _id: testId }).populate("attendedUsers");

  if (!test) {
    return next(new ErrorHandler("Test not found", 400));
  }

  test.attendedUsers.forEach((user) => {
    if (user.userId.toString() === req.testUser._id.toString()) {
      return next(new ErrorHandler("You already attended the test", 400));
    }
  });
  next();
});

// check if test expired
exports.checkTestExpired = catchAsyncError(async (req, res, next) => {
  const testId = req.params.testId || req.params.id;
  const test = await Test.findById({ _id: testId });

  if (!test) {
    return next(new ErrorHandler("Test not found", 400));
  }

  if (new Date(test.expiryDate) < new Date(Date.now())) {
    test.status = "Inactive";
    await test.save({validateBeforeSave: false});
  }

  if (test.status == "Inactive") {
    return next(new ErrorHandler("Test has been expired", 400));
  }
  next();
});

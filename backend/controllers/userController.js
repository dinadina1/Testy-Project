// require the necessary  modules
const User = require("../models/userModel");
const Test = require("../models/testModel");
const Question = require("../models/questionModel");
const UserResponse = require("../models/userResponseModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// create user for test - /api/v1/user/new
exports.newUser = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("Please enter the required fields", 400));
  }

  const userOld = await User.findOne({ email: req.body.email });

  let user = {};
  if (userOld) {
    user = await User.findByIdAndUpdate(userOld._id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    // create user
    user = await User.create(req.body);
  }

  res.status(201).cookie("test_user_id", user._id).json({
    success: true,
    user,
  });
});

// get user - /api/v1/user/me
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById({ _id: req.testUser._id });
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  return res.status(201).json({
    success: true,
    user,
  });
});

// create and update user response - /api/v1/user/response/:testId
exports.createUserResponse = catchAsyncError(async (req, res, next) => {
 
  const response = await UserResponse.findOne({
    userId: req.testUser._id,
    testId: req.params.testId,
  });

  let data;
  let userResponse;
  let newData = {};
  if (!response) {
    // create user response if response does not exist
    userResponse = await UserResponse.create({
      userId: req.testUser._id,
      testId: req.params.testId,
      responses: [...req.body.responses],
    }
  );
   
  } else {
    // update user response if exist
    data = response.responses.filter((res) => {
      if (
        res.questionId !=
        req.body.responses[0].questionId
      ) {
        return res;
      }
    });

    // assigning values
    newData.testId = response.testId;
    newData.userId = response.userId;
    newData.responses = [...data, ...req.body.responses];

    // update user response
    userResponse = await UserResponse.findByIdAndUpdate(response._id, newData, {
      new: true,
      runValidators: true,
    });
  }

  res.status(200).json({
    success: true,
    message: "User response created successfully",
    responseUserCount: userResponse.responses.length,
    response: userResponse,
  });
});

// Get user response - /api/v1/user/response/:testId
exports.getUserResponse = catchAsyncError(async (req, res, next) => {
  const response = await UserResponse.findOne({
    userId: req.body.userId,
    testId: req.params.testId,
  }).populate('userId').populate('testId').populate('responses.questionId').exec();

  if (!response) {
    return res.status(200).json({
      success: true,
      message: "User response not found",
      responseUserCount: 0,
      response: {},
    });
  }

  res.status(200).json({
    success: true,
    message: "User response fetched successfully",
    responseUserCount: response.responses.length,
    response: response,
  });
});


// submit response = /api/v1/user/submit/:testId
exports.submitResponse = catchAsyncError(async (req, res, next) => {
// Get test details
  const test = await Test.findOne({_id: req.params.testId}).populate('topRank.userId').populate('questions').populate('createdBy').populate('attendedUsers.userId').exec();

  if (!test) {
    return next(new ErrorHandler("Test not found", 400));
  }

  // Get user response
  const response = await UserResponse.findOne({
    userId: req.testUser._id,
    testId: req.params.testId,
  }).populate('userId').populate('testId').populate('responses.questionId').exec();

  if (!response) {
    return next(new ErrorHandler("User response not found", 400));
  }

  response.isSubmitted = true;
  let {totalScore, minimumScore, topRank, attendedUsers, questions} = test;
  let {responses} = response;

  const perQuestionMark = totalScore / questions.length;
  let score = 0;
  let correctAnswers = 0;

  // update score and correctedQuestion
 responses = responses.map((res) => questions.forEach((ques) => {
      if (ques._id.toString() === res.questionId._id.toString()) {
        if (JSON.stringify(res.selectedOption) === JSON.stringify(ques.rightOption)) {
          score += perQuestionMark;
          correctAnswers += 1;
          res.isCorrect = true;
        }
      }
    }));

  // update attended users
  attendedUsers.push({
    userId: response.userId._id,
    score,
    correctAnswers,
  });

  // find top rank
  if(topRank.userId === null){
    topRank.userId = response.userId._id;
    topRank.score = score.toFixed(2);
  } else {
    attendedUsers.forEach((user) => {
    if (user.score > topRank.score) {
      topRank.userId = user.userId;
      topRank.score = user.score;
    }
  })
}

response.score = score;
response.correctAnswers = correctAnswers;
// save
await test.save();
await response.save();
// await test.populate('topRank').populate('questions').populate('createdBy').execPopulate();

  res.status(200).json({
    success: true,
    message: "Test submitted successfully",
    test,
    response,
  });
});
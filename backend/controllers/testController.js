const catchAsyncError = require("../middleware/catchAsyncError");
const Test = require("../models/testModel");
const Question = require("../models/questionModel");
const ErrorHandler = require("../utils/errorHandler");

// new test - /api/v1/test/new
exports.newTest = catchAsyncError(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  // create test
  const test = await Test.create(req.body);

  let testUrl;
  if(process.env.NODE_ENV === 'development'){
    testUrl = `${req.protocol}://${req.get('host')}/${test._id}`;
  }else{
    testUrl = `http://34.207.172.178/${test._id}`;
  }

  test.testUrl = testUrl;
  await test.save();

  res.status(201).json({
    success: true,
    test,
  });
});

// get all tests - /api/v1/test/all
exports.getAllTests = catchAsyncError(async (req, res, next) => {
  let tests;
  let count;
  if (req.query.page) {
    const pageSize = 3;
    const page = Number(req.query.page) || 1;
    count = await Test.countDocuments();
    tests = await Test.find()
      .populate("createdBy")
      .populate("questions")
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .exec();
  } else {
    tests = await Test.find()
      .populate("createdBy")
      .populate("questions")
      .exec();
  }

  res.status(200).json({
    success: true,
    count: count,
    totPages: Math.ceil(count / 3),
    resPerPage: tests.length,
    tests,
  });
});

// update test - /api/v1/test/:id
exports.updateTest = catchAsyncError(async (req, res, next) => {
  let test = await Test.findById({ _id: req.params.id });

  if (!test) {
    return next(
      new ErrorHandler(
        `Test Details not found for the id: ${req.params.id}`,
        400
      )
    );
  }

  // update test details
  test = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Test details updated successfully",
    test,
  });
});

// get test - /api/v1/test/:id
exports.getTest = catchAsyncError(async (req, res, next) => {
  const test = await Test.findById({ _id: req.params.id })
    .populate("createdBy")
    .populate("questions")
    .populate("topRank.userId")
    .populate("attendedUsers.userId")
    .exec();

  if (!test) {
    return next(
      new ErrorHandler(
        `Test Details not found for the id: ${req.params.id}`,
        400
      )
    );
  }

  res.status(200).json({
    success: true,
    message: "Test details fetched successfully",
    questionCount: test.questions.length,
    test,
  });
});

// delete test - /api/v1/test/:id
exports.deleteTest = catchAsyncError(async (req, res, next) => {
  const test = await Test.findById({ _id: req.params.id });

  if (!test) {
    return next(
      new ErrorHandler(
        `Test Details not found for the id: ${req.params.id}`,
        400
      )
    );
  }

  // delete test by id
  await Test.findByIdAndDelete({ _id: test._id });

  // delete questions associated with the test
  await Question.deleteMany({ _id: { $in: test.questions } });

  res.status(200).json({
    success: true,
    message: "Test deleted successfully",
  });
});

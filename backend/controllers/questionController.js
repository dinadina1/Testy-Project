const catchAsyncError = require("../middleware/catchAsyncError");
const Question = require("../models/questionModel");
const Test = require("../models/testModel");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// create question - /api/v1/question/new/:testId
exports.newQuestion = catchAsyncError(async (req, res, next) => {
  req.body.createdBy = req.user.id;
  req.body.test = req.params.testId;

  const question = await Question.create(req.body);

  // Get Test
  const test = await Test.findById({ _id: req.params.testId });

  if(!test) return next(new ErrorHandler(`Test not found for the id: ${req.params.testId}`, 404));

  test.questions = test.questions.length?  [...test.questions, question] : [question];

  // save test
  await test.save();

  res.status(201).json({
    success: true,
    message: "Question created successfully",
    question,
  });
});

// creating many questions = /api/v1/question/newquestions/:testId
exports.newQuestions = catchAsyncError(async (req, res, next) => {

  let newQuestions = req.body.map((data) => {
    data.createdBy = req.user.id;
    data.test = req.params.testId;
    return data;
  });

  // insert array
  const bulkQuestions = await Question.insertMany(newQuestions);

  // finding question id
  let bulkQuestionsId = bulkQuestions.map((question) => question._id);

  // update question into test
  const test = await Test.findById({_id: req.params.testId});

  if(!test) return next(new ErrorHandler(`Test not found for the id: ${req.params.testId}`, 404));

  test.questions = [...test.questions, ...bulkQuestionsId];

  // save test
  await test.save();

  res.status(201).json({
    success: true,
    message: "Questions created successfully",
    count: bulkQuestions.length,
    questions: bulkQuestions
  });
});

// get question - /api/v1/question/:testId?page=1
exports.getQuestion = catchAsyncError(async (req, res, next) => {

  let resPerPage = 1;

  // Build query using APIFeatures
  const apiFeatures = new APIFeatures(Question.find({test: req.params.testId}), req.query).paginate(resPerPage);

  // count documents
  const totalDocuments = await Question.countDocuments({test: req.params.testId});

  // Execute query
  const question = await apiFeatures.query.populate('test');

  res.status(200).json({
    success: true,
    count: totalDocuments,
    resPerPage,
    currentPage: req.query.page,
    question
  });
});

// get all questions - /api/v1/question/all/:testId
exports.getAllQuestions = catchAsyncError(async (req, res, next) => {

  let questions;
  if(req.query.testId){
     questions = await Question.find({test: req.query.testId}).populate('test createdBy');
  } else {
      questions = await Question.find().populate('test createdBy');
  }

  res.status(200).json({
    success: true,
    count: questions.length,
    questions
  });
});

// delete question - /api/v1/question/:questionId
exports.deleteQuestion = catchAsyncError(async (req, res, next) => {

  const question = await Question.findById(req.params.questionId);

  if(!question) return next(new ErrorHandler(`Question not found for the id: ${req.params.questionId}`, 404));

  // remove question in test
  await Test.updateOne({_id: question.test}, {$pull: {questions: question._id}});

  // delete question
  await question.deleteOne();

  res.status(200).json({
    success: true,
    message: "Question deleted successfully"
  });
});

// get particular question - /api/v1/question/single/:questionId
exports.getParticularQuestion = catchAsyncError(async (req, res, next) => {

  const question = await Question.findById(req.params.questionId).populate('test createdBy');

  if(!question) return next(new ErrorHandler(`Question not found for the id: ${req.params.questionId}`, 404));

  res.status(200).json({
    success: true,
    question
  });
});

// update question - /api/v1/question/:questionId
exports.updateQuestion = catchAsyncError(async (req, res, next) => {

  let question = await Question.findById(req.params.questionId);

  if(!question) return next(new ErrorHandler(`Question not found for the id: ${req.params.questionId}`, 404));

  question = await Question.findByIdAndUpdate(req.params.questionId, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    message: "Question updated successfully",
    question
  });
});

// download sample template - /api/v1/question/admin/template
exports.downloadTemplate = catchAsyncError(async (req, res, next) => {
  const csvContent = `questionText,option1,option2,option3,option4,rightAnswer,difficulty
"What is 2+2?","3","4","5","6","4","easy"
"What is the capital of France?","London","Berlin","Paris","Madrid","Paris","medium"
"Which planet is closest to the sun?","Venus","Mercury","Earth","Mars","Mercury","hard"`;
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="questions_template.csv"');
  res.status(200).send(csvContent);
});
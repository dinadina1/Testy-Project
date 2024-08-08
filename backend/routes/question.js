// require express router
const express = require('express');
const router = express.Router();
const {newQuestion, newQuestions, getQuestion, getAllQuestions, deleteQuestion, getParticularQuestion, updateQuestion} = require('../controllers/questionController');
const {isAuthenticatedUser, authorizeRoles, checkTestAttended, authenticateTestUser} = require('../middleware/authenticate');

// user routes
router.route('/:testId').get(authenticateTestUser, checkTestAttended, getQuestion);

// admin routes
router.route('/admin/new/:testId').post(isAuthenticatedUser, authorizeRoles('admin'), newQuestion);
router.route('/admin/newquestions/:testId').post(isAuthenticatedUser, authorizeRoles('admin'), newQuestions);
router.route('/admin/all').get(isAuthenticatedUser, authorizeRoles('admin'),getAllQuestions);
router.route('/admin/:testId').get(isAuthenticatedUser, authorizeRoles('admin'),getQuestion)
router.route('/admin/:questionId').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteQuestion)
router.route('/admin/single/:questionId').get(isAuthenticatedUser, authorizeRoles('admin'),getParticularQuestion);
router.route('/admin/:questionId').put(isAuthenticatedUser, authorizeRoles('admin'), updateQuestion);

// export router
module.exports = router;
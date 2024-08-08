// require express router
const express = require('express');
const router = express.Router();
const {newTest, getAllTests, updateTest, getTest, deleteTest} = require('../controllers/testController');
const {isAuthenticatedUser, authorizeRoles, authenticateTestUser, checkTestAttended, checkTestExpired} = require('../middleware/authenticate');

//user routes
router.route('/:id')
        .get(authenticateTestUser, checkTestAttended, checkTestExpired, getTest)
        .put(authenticateTestUser, checkTestAttended, updateTest);

// Admin routes
router.route('/admin/new').post(isAuthenticatedUser, authorizeRoles('admin'), newTest);
router.route('/admin/all').get(isAuthenticatedUser, authorizeRoles('admin'), getAllTests);
router.route('/admin/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateTest)
    .get(isAuthenticatedUser, authorizeRoles('admin'), getTest)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteTest);

module.exports = router;
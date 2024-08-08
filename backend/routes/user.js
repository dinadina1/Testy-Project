// require express router
const express = require('express');
const router = express.Router();
const { authenticateTestUser, checkTestAttended, checkTestExpired } = require('../middleware/authenticate');
const { newUser, getUser, createUserResponse, getUserResponse, submitResponse } = require('../controllers/userController');

// routes
router.route('/new').post(newUser);
router.route('/me').get(authenticateTestUser, getUser);
router.route('/response/:testId')
        .post(authenticateTestUser, checkTestAttended, createUserResponse)
        .get( getUserResponse);

router.route('/submit/:testId').get(authenticateTestUser, checkTestAttended, submitResponse);


// export router
module.exports = router;
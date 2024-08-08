// require express router
const express = require('express');
const router = express.Router();
const {newAuthUser, loginAuthUser, logoutAuthUser, myProfile, forgotPassword, resetPassword, updatePassword, getAllUsers, deleteAuthUser, getUserDetails} = require('../controllers/authController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/authenticate');

// admin routes
router.route('/admin/new').post(isAuthenticatedUser, authorizeRoles('admin'), newAuthUser);
router.route('/admin/login').post(loginAuthUser);
router.route('/admin/logout').get(isAuthenticatedUser, authorizeRoles('admin'), logoutAuthUser);
router.route('/admin/myprofile').get(isAuthenticatedUser, authorizeRoles('admin'), myProfile);
router.route('/admin/password/update').put(isAuthenticatedUser, authorizeRoles('admin'), updatePassword);
router.route('/admin/password/forgot').post(forgotPassword);
router.route('/admin/password/reset/:token').post(resetPassword);
router.route('/admin/all').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.route('/admin/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAuthUser);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails);


module.exports = router;
// require auth model
const catchAsyncError = require("../middleware/catchAsyncError");
const Auth = require("../models/authModel");
const ErrorHandler = require("../utils/errorHandler");
const sendJwtToken = require("../utils/jwt");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

// new user - /api/v1/auth/new
exports.newAuthUser = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;

  // check if user exists
  const userExists = await Auth.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await Auth.create({
    username,
    email,
    password,
  });
  return res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
});

// login - /api/v1/auth/login
exports.loginAuthUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // check if user exists
  const user = await Auth.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // check if password is correct
  if (!(await user.isPasswordValid(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // sendJWTToken
  sendJwtToken(user, 201, res);
});

// logout - /api/v1/auth/logout
exports.logoutAuthUser = catchAsyncError(async (req, res, next) => {
  res
    .cookie("jwtToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

// get loggedin user - /api/v1/auth/logout
exports.myProfile = catchAsyncError(async (req, res, next) => {
    // find user in database
    const user = await Auth.findOne({_id: req.user.id})
    if(!user){
        return next(new ErrorHandler('User Does not exist', 400))
    }

    return res.status(200).json({
        success: true,
        user
    })
})

// Forgot password - /api/v1/auth/admin/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    // find user in database
    const user = await Auth.findOne({email: req.body.email})
    if(!user){
        return next(new ErrorHandler('User Does not exist', 400))
    }

    // get reset password token
    const resetToken = user.getPasswordResetToken();

    await user.save({validateBeforeSave: false})

    let BASE_URL = process.env.FRONTEND_URL
    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    // create reset password url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows: \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Testy Password Recovery',
            message
        })

        return res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave: false})

        return next(new ErrorHandler(error.message, 500))
    }
})

// reset password - /api/v1/auth/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await Auth.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: {$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler('Invalid token', 400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400))
    }

    // set new password
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined

    await user.save({validateBeforeSave: false})

    sendJwtToken(user, 200, res)
})

// change password - /api/v1/auth/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await Auth.findOne({_id: req.user.id}).select('+password')

    // check old password
    if(!(await user.isPasswordValid(req.body.oldPassword))){
        return next(new ErrorHandler('Invalid old password', 400))
    }

    user.password = req.body.password
    await user.save()

    return res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    })
})

// get all users - api/v1/auth/admin/all
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await Auth.find();

  res.status(201).json({
    success: true,
    users,
  });
});

// delete auth user
exports.deleteAuthUser = catchAsyncError(async (req, res, next) => {
  const user = await Auth.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// get user details - /api/v1/auth/admin/user/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await Auth.findById(req.params.id).select('+password');

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
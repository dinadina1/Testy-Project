// require mongoose
const mongoose = require('mongoose');
// require bcrypt
const bcrypt = require('bcrypt');
// require jsonwebtoken
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

// auth Schema
const authSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        select: false
    },
    role: {
        type: String,
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date
});

// hash password
authSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// check password if is valid
authSchema.methods.isPasswordValid = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// generate jwt token
authSchema.methods.getJwtToken = async function (){
    return jwt.sign({id:this._id, email:this.email}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

// generate password reset token
authSchema.methods.getPasswordResetToken = function (){
    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    // generate hash and set resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

// check password is valid
authSchema.methods.isPasswordValid = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// export model
const authModel = mongoose.model('Auth', authSchema);
module.exports = authModel;
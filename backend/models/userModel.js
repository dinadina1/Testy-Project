// require mongoose
const mongoose = require('mongoose');

// user Schema
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter your firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your lastname']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email']
    },
    phoneNo: {
        type: String,
        required: [true, 'Please enter your phone no']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// export model  
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
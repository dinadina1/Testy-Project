// require mongoose
const mongoose = require("mongoose");

// test Schema
const testSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a test title"],
  },
  description: {
    type: String,
    required: [true, "Please enter a test description"],
  },
  totalScore: {
    type: Number,
    required: [true, "Please enter a test total score"],
  },
  minimumScore: {
    type: Number,
    required: [true, "Please enter a test minimum score"],
  },
  expiryDate: {
    type: String,
    required: [true, "Please enter a test expiry date"],
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive"],
  },
  attendedUsers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      score: { type: Number, default: 0 },
      correctAnswers: { type: Number, default: 0 },
    },
  ],
  topRank: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    score: { type: Number, default: 0 },
  },
  questions: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    },
  ],
  duration: {
    type: String,
    required: [true, "Please enter a test duration in minutes"],
  },
  testUrl: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Auth",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export model
const testModel = mongoose.model("Test", testSchema);
module.exports = testModel;

const mongoose = require("mongoose");

// Define userResponse Schema
const userResponseSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: false,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    unique: false,
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        unique: false,
      },
      selectedOption: [
        {
        type: Boolean,
        default: [false, false, false, false]
        }
      ],
      isCorrect: {
        type: Boolean,
        default: false,
      },
      selectedOptionText: {
        type: String,
        default: null, 
      },
    },
  ],
  correctAnswers: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  isSubmitted: {
    type: Boolean,
    default: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Export model
const userResponseModel = mongoose.model("UserResponse", userResponseSchema);
module.exports = userResponseModel;

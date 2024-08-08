// require mongoose
const mongoose = require("mongoose");

// auth Schema
const questionSchema = mongoose.Schema({
  questionText: {
    type: String,
    required: [true, "Please enter question"],
  },
  options: [
    {
      optionText: {
        type: String,
      },
      option: {
        type: Boolean,
      }
    },
  ],
  rightAnswer: {
    type: String,
    required: [true, "Please enter right answer"],
  },
  rightOption: [
    {
      type : Boolean,
      required: true
    }
  ],
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard","Easy", "Medium", "Hard"],
    default: "medium",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
  },
});

// export schema
const questionModel = mongoose.model("Question", questionSchema);
module.exports = questionModel;

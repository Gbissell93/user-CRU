const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
    },
    isDone: {
      type: Boolean,
    },
    todoOwner: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("todo", TodoSchema);

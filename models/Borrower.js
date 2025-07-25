const mongoose = require("mongoose");

const BorrowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Borrower name is required"],
  },

  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Book being borrowed is required"],
    unique: true,
  },

  borrowedAt: {
    type: Date,
    default: Date.now,
  },

  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
  },

  returned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Borrower", BorrowerSchema);

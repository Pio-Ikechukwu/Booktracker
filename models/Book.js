const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    unique: true,
  },

  author: {
    type: String,
    required: [true, "Book author is required"],
  },

  status: {
    type: String,
    enum: ["read", "unread", "reading"],
    default: "unread",
  },

  location: {
    type: String,
    enum: ["shelf", "lost", "loaned"],
    default: "shelf",
  },
});

module.exports = mongoose.model("Book", BookSchema);

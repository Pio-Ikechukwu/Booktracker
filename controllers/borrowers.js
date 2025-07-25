const Borrower = require("../models/Borrower");
const Book = require("../models/Book");

// Get all borrowers
// route = GET api/v1/borrowers
exports.getBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.find().populate("book");
    res
      .status(200)
      .json({ success: true, count: borrowers.length, data: borrowers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get borrower by id
// route = GET api/v1/borrowers/:id
exports.getBorrowerById = async (req, res) => {
  try {
    const borrower = await Borrower.findById(req.params.id).populate("book");
    if (!borrower) {
      return res
        .status(404)
        .json({ success: false, error: "Borrower not found" });
    }
    res.status(200).json({ success: true, data: borrower });
  } catch (err) {
    res.status(400).json({ success: false, error: "Invalid borrower ID" });
  }
};

// Add borrower
// route = POST api/v1/borrowers
exports.createBorrower = async (req, res) => {
  const { name, bookId } = req.body;

  try {
    // Check if book is already loaned out
    const existingBorrow = await Borrower.findOne({
      book: bookId,
      returnedAt: null,
    });
    if (existingBorrow) {
      return res
        .status(409)
        .json({ success: false, error: "Book already borrowed" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    // Update book status/location
    book.location = "loaned";
    await book.save();

    const borrower = await Borrower.create({ name, book: bookId });
    res.status(201).json({ success: true, data: borrower });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Mark book as returned
// route = PUT api/v1/borrowers/:id/return
exports.returnBook = async (req, res) => {
  try {
    const borrower = await Borrower.findById(req.params.id);
    if (!borrower) {
      return res
        .status(404)
        .json({ success: false, error: "Borrower not found" });
    }

    if (borrower.returnedAt) {
      return res
        .status(400)
        .json({ success: false, error: "Book already returned" });
    }

    borrower.returnedAt = new Date();
    await borrower.save();

    const book = await Book.findById(borrower.book);
    book.location = "shelf";
    await book.save();

    res.status(200).json({ success: true, message: "Book returned" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

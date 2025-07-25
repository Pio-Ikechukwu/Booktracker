const Book = require("../models/Book");

// Add book
// route = POST api/v1/books
exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all books
// route = GET api/v1/books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ ...req.query });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get book by id
// Route = GET api/v1/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Invalid book ID",
    });
  }
};
// Update book
// route = PUT api/v1/books/:id
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Invalid request",
    });
  }
};

// Delete book
// route = DELETE api/v1/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Invalid book ID",
    });
  }
};

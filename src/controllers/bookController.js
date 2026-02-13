import Book from "../models/Book.js";

// ✅ CREATE Book
export const createBook = async (req, res) => {
  try {
    // Attach logged-in user
    const book = new Book({ ...req.body, user: req.user._id });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET All Books (for logged-in user)
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET Single Book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    // Optional: check ownership
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to view this book" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE Book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    // Check if the logged-in user owns this book
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to edit this book" });
    }

    // Update fields
    const { title, author, price, category, year } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.price = price || book.price;
    book.category = category || book.category;
    book.year = year || book.year;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE Book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    // Check ownership
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this book" });
    }

    await book.remove();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Book from "../models/booksModel.mjs";
import { postbookerrorhandler } from "../middlewares/errorHandler.mjs";

export const getAllBooks = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const booksPerPage = 6;

    // Find the total number of books
    const totalBooks = await Book.countDocuments();

    const books = await Book.find()
      .skip(page * booksPerPage)
      .limit(booksPerPage);

    if (!books || books.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No books found.",
        data: [],
        totalPages: 0, // Include the total number of pages in the response
      });
    }

    const totalPages = Math.ceil(totalBooks / booksPerPage);

    res.status(200).json({
      status: "success",
      results: books.length,
      data: {
        books,
      },
      totalPages, // Include the total number of pages in the response
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        "Oops! Something went wrong. Please try again later or contact support.",
    });
  }
};

export const getBooksById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        "Oops! Something went wrong. Please try again later or contact support.",
    });
  }
};

export const postBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    console.log(book);
    const Savebook = await book.save();
    res.status(200).json({ message: "done", book: Savebook });
  } catch (error) {
    const era = postbookerrorhandler(error);
    res.status(500).json(era);
  }
};

export const deleteBooksById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        status: "error",
        message: "Book not found. Nothing was deleted.",
        data: null,
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        "Oops! Something went wrong. Please try again later or contact support.",
    });
  }
};

export const updateBooksById = async (req, res) => {
  try {
    const updatesId = req.params.id;
    const updates = req.body;

    const updatedBook = await Book.findByIdAndUpdate(updatesId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        status: "error",
        message: "Book not found. No updates were made.",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        updatedBook,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        "Oops! Something went wrong. Please try again later or contact support.",
    });
  }
};

export const queryBooks = async (req, res) => {
  try {
    const titleQuery = req.query.title;

    if (!titleQuery) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a title query.",
        data: [],
      });
    }

    const books = await Book.find({
      bookTitle: { $regex: titleQuery, $options: "i" },
    });

    if (!books || books.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No books found for the provided query.",
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      results: books.length,
      data: {
        books,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        "Oops! Something went wrong. Please try again later or contact support.",
    });
  }
};

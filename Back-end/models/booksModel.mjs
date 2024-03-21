import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookImage: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
    unique: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookDescription: {
    type: String,
    required: true,
  },
  bookAdditionalInfo: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;

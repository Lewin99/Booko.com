import express from "express";
import {
  deleteBooksById,
  getAllBooks,
  getBooksById,
  postBook,
  queryBooks,
  updateBooksById,
} from "../controllers/booksController.mjs";

const booksrouter = express.Router();

booksrouter.get("/", getAllBooks);
booksrouter.get("/search", queryBooks);
booksrouter.get("/:id", getBooksById);
booksrouter.post("/", postBook);
booksrouter.put("/:id", updateBooksById);
booksrouter.delete("/:id", deleteBooksById);

export default booksrouter;

import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  bookImage: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookDescription: {
    type: String,
    required: true,
  },
});

const Favourite = mongoose.model("Favourite", favSchema);

export default Favourite;

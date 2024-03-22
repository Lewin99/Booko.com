import Favourite from "../models/favModel.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { postfaverrorhandler } from "../middlewares/errorHandler.mjs";

dotenv.config();
const Secret_Key = process.env.SECRET_key;

export const postfav = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, Secret_Key);
  const userId = decoded.userId;
  try {
    const existingFav = await Favourite.findOne({
      user: userId,
      bookTitle: req.body.bookTitle,
    });

    if (existingFav) {
      return res
        .status(409)
        .json({ message: "You have already saved this book" });
    } else {
      const favData = {
        user: userId,
        bookImage: req.body.bookImage,
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        bookDescription: req.body.bookDescription,
      };

      const fav = new Favourite(favData);

      const Savefav = await fav.save();
      res.status(200).json({ message: "done", book: Savefav });
    }
  } catch (error) {
    postfaverrorhandler(error);
  }
};

export const getAllfavs = async (req, res) => {
  try {
    const favs = await Favourite.find();

    if (!favs || favs.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No favorites found.",
      });
    }

    res.status(200).json({
      status: "success",
      results: favs.length,
      data: {
        favs,
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

export const getuserfav = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, Secret_Key);
  const userId = decoded.userId;
  try {
    const Books = await Favourite.find({ user: userId });
    res.status(200).json({ message: "done", books: Books });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFavById = async (req, res) => {
  try {
    const fav = await Favourite.findById(req.params.id);

    if (!fav) {
      return res.status(404).json({
        status: "error",
        message: "Favorite not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        fav,
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

export const deleteFavById = async (req, res) => {
  try {
    const updatesId = req.params.id;
    const deletedFav = await Favourite.findByIdAndDelete(updatesId);

    if (!deletedFav) {
      return res.status(404).json({
        status: "error",
        message: "Favorite not found. Nothing was deleted.",
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

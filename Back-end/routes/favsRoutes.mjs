import express from "express";
import {
  postfav,
  getAllfavs,
  deleteFavById,
  getuserfav,
  getFavById,
} from "../controllers/favController.mjs";

const favsrouter = express.Router();

favsrouter.post("/", postfav);
favsrouter.get("/", getAllfavs);
favsrouter.get("/userfav", getuserfav);
favsrouter.get("/:id", getFavById);
favsrouter.delete("/:id", deleteFavById);

export default favsrouter;

import express from "express";
import { extractUserIdMiddleware } from "../middlewares/UserIdMiddleware.mjs";
import {
  postfav,
  getAllfavs,
  deleteFavById,
  getuserfav,
  getFavById,
} from "../controllers/favController.mjs";

const favsrouter = express.Router();

favsrouter.post("/", extractUserIdMiddleware, postfav);
favsrouter.get("/", getAllfavs);
favsrouter.get("/userfav", extractUserIdMiddleware, getuserfav);
favsrouter.get("/:id", getFavById);
favsrouter.delete("/:id", deleteFavById);

export default favsrouter;

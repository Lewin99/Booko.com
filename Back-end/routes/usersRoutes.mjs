import express from "express";
import {
  postuser,
  getallusers,
  getUserById,
  verifyAuthentication,
  login,
  logout,
} from "../controllers/usersController.mjs";

const usersrouter = express.Router();

usersrouter.post("/", postuser);
usersrouter.post("/login", login);
usersrouter.get("/Auth", verifyAuthentication);
usersrouter.post("/logout", logout);
usersrouter.get("/", getallusers);
usersrouter.get("/:id", getUserById);

export default usersrouter;

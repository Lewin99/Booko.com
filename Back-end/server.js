import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import booksrouter from "./routes/booksRoutes.mjs";
import favsrouter from "./routes/favsRoutes.mjs";
import usersrouter from "./routes/usersRoutes.mjs";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const conString = process.env.Db_connect;

(async () => {
  try {
    await mongoose.connect(conString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful");
  } catch (error) {
    console.error("Connection error:", error);
  }
})();

const corsOptions = {
  origin: "https://booko-com.vercel.app/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true,
};
const app = express();

app.use(express.json());
app.use(cookieParser());
app.options("*", cors(corsOptions));

app.use("/books", booksrouter);
app.use("/users", usersrouter);
app.use("/favourites", favsrouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import user from "../models/userModel.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { saveuserErrorHandler } from "../middlewares/errorHandler.mjs";

dotenv.config();
const Secret_Key = process.env.SECRET_key;

export const postuser = async (req, res) => {
  try {
    const _user = new user(req.body);
    const Saveuser = await _user.save();
    res.status(200).json({ message: "done", user: Saveuser });
  } catch (error) {
    const err = saveuserErrorHandler(error);
    res.status(400).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginuser = await user.findOne({ email });

    if (!loginuser || !(await bcrypt.compare(password, loginuser.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      const expiresIn = Date.now() + 24 * 60 * 60 * 1000;
      const Access_token = jwt.sign(
        { userId: loginuser._id, email: loginuser.email },
        Secret_Key,
        { expiresIn: `${expiresIn}s` }
      );

      res.status(200).json({
        message: "Login successful",
        Access_token,
        expiresIn,
      });
    }
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyAuthentication = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    const decodedToken = jwt.verify(token, Secret_Key);
    if (decodedToken) {
      res.status(200).json({ isAuthenticated: true });
    }
  } catch (error) {
    console.error("Error in verifyAuthentication:", error);

    return res.status(401).json({ isAuthenticated: false });
  }
};

export const logout = (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getallusers = async (req, res) => {
  try {
    const allusers = await user.find();
    if (allusers.length === 0) {
      return res.status(200).json({ users: [], message: "No users found" });
    } else {
      res.status(200).json({
        status: "success",
        results: allusers.length,
        data: {
          allusers,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        "Oops! Something went wrong. Please try again later or contact support.",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const usr = await user.findById(req.params.id);

    if (!usr) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        usr,
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

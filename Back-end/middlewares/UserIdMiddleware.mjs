import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const Secret_Key = process.env.SECRET_key;

// Middleware function to extract user ID from JWT token
export const extractUserIdMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.cookies.token;
  console.log(token);

  // Check if the token is missing or doesn't start with 'Bearer '
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      // Verify and decode the JWT token
      const decodedToken = jwt.verify(token, Secret_Key);
      console.log("decoded token", decodedToken);

      // Extract the user ID from the decoded token (assuming 'userId' is the key)
      req.userId = decodedToken.userId;
      // You can customize the key based on how your token payload is structured

      // Continue processing the request
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};

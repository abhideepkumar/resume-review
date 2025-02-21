import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const authMiddleware = (req, res, next) => {
  console.log("Auth Middleware invoked");

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next(new ApiError(401, "Authorization header missing"));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new ApiError(401, "Token missing"));
  }

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ApiError(401, "Invalid token"));
  }
};

export default authMiddleware;

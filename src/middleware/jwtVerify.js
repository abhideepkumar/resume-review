import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const verifyAuthToken = (token) => {
  // console.log("Token:", token);
  if (!token) {
    console.log("No token");
    throw new ApiError(401, "Authorization token missing");
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid token");
  }
};
export default verifyAuthToken;

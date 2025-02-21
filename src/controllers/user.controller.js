import { asyncHandler } from "../utils/asyncHandler.js";
import { validateFields } from "../utils/validator.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//login user
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log("Details server got for :", username);

  validateFields({ username, password });
  console.log("All fields are valid in loginUser");

  const credentials = { username: "naval.ravikant", password: process.env.ADMIN_PASSWORD_HASH };
  // Check for username and password
  if (username !== credentials.username) {
    return res.status(401).json(new ApiResponse(401, "Invalid credentials"));
  }
  // compare with hashed password
  const isMatch = await bcrypt.compare(password, credentials.password);
  if (!isMatch) {
    return res.status(401).json(new ApiResponse(401, "Invalid credentials"));
  } else {
    const token = await jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

    return res.status(200).json(new ApiResponse(200, "Login successful", { JWT: token }));
  }
});

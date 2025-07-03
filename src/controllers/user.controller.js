import { asyncHandler } from "../utils/asyncHandler.js";
import { validateFields } from "../utils/validator.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { user } from "../models/users.model.js";

//login user
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log("Details server got for :", username);

  validateFields({ username, password });
  console.log("All fields are valid in loginUser");
  try {
    const userFound = await user.findOne({ username });
    if (userFound) {
      // compare with hashed password
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(401).json(new ApiResponse(401, "Invalid credentials"));
      } else {
        //sign jwt token 
        const token = await jwt.sign({ username: username }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        return res.status(200).json(new ApiResponse(200, "Login successful", { JWT: token }));
      }
    } else {
      return res.status(401).json(new ApiResponse(401, "Invalid credentials"));
    }
  } catch (err) {
    return res.status(500).json(new ApiResponse(401, "Internal Server Error"));
  }
});

//new user
export const newUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  //add password to db
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newuser = await user.create({ username, password: hashPassword });
    console.log("Result: ", newuser);
    //return response that user created
    return res.status(200).json(new ApiResponse(200, `Signup Successful for ${username}`));
  } catch (err) {
    console.log("error : ", err?.errorResponse?.errmsg || "Error creating user");
    //handle username exist
    if (err?.errorResponse?.code === 11000)
      return res.status(409).json(new ApiResponse(409, "Username already exist.", err?.errorResponse));
    else
      return res.status(404).json(new ApiResponse(500, "Sorry, error from our side. Try again!.", err?.errorResponse));
  }
});

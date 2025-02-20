import { asyncHandler } from "../utils/asyncHandler.js";
import { validateFields } from "../utils/validator.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import promptText from "../utils/prompt.js";
import { parseResumeData } from "../utils/stringToJson.js";
import { user } from "../models/user.model.js";
import jwtVerify from "../middleware/jwtVerify.js";
import callGeminiAPI from "../utils/callGemini.js";

export const uploadResume = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  const { raw_text } = req.body;

  // Verify auth token and validate input
  jwtVerify(token);
  validateFields({ raw_text });

  // Generate and process content
  const prompt = promptText(raw_text);
  const generatedContent = await callGeminiAPI(prompt);
  const resumeJson = parseResumeData(generatedContent);

  // Save user data
  const userData = new user({
    name: resumeJson.name,
    email: resumeJson.email,
    ResumeJson: resumeJson,
  });
  const newUser = await user.create(userData);
  console.log("User data:", newUser);
  return res.status(200).json(
    new ApiResponse(200, {
      generatedContent,
      message: "Resume processed and saved successfully",
    })
  );
});

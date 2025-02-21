import { asyncHandler } from "../utils/asyncHandler.js";
import { validateFields } from "../utils/validator.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import promptText from "../utils/prompt.js";
import { parseResumeData } from "../utils/stringToJson.js";
import { applicant } from "../models/applicant.model.js";
import jwtVerify from "../middleware/jwtVerify.js";
import callGeminiAPI from "../utils/callGemini.js";
import downloadAndParsePDF from "../utils/pdfUtil.js";

// Upload resume
export const uploadResume = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  const { url } = req.body;

  // Verify auth token and validate input
  jwtVerify(token);
  validateFields(url);
  const raw_text = await downloadAndParsePDF(url);
  if (!raw_text) {
    return res.status(500).json(new ApiResponse(500, "Error parsing PDF"));
  }
  // Generate and process content
  const prompt = promptText(raw_text);
  const generatedContent = await callGeminiAPI(prompt);
  const resumeJson = parseResumeData(generatedContent);

  // Save applicant data
  const newUser = await applicant.create(resumeJson);
  console.log("applicant data:", newUser);
  return res.status(200).json(
    new ApiResponse(200, {
      message: "Resume processed and saved successfully",
      generatedContent,
    })
  );
});

// Search resume using name
export const searchResume = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { token } = req.cookies;

  // Verify auth token and validate input
  jwtVerify(token);
  validateFields({ name });

  const searchPattern = new RegExp(name, "i");
  try {
    const userFound = await applicant.find({ name: searchPattern });

    if (!userFound || userFound.length === 0) {
      return res.status(404).json(new ApiResponse(404, "No applicants found"));
    }

    return res.status(200).json(
      new ApiResponse(200, {
        TotalUsersFound: userFound.length,
        message: "Applicant data retrieved successfully",
        userFound,
      })
    );
  } catch (error) {
    console.error("Error searching for applicant data:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, { message: "Error occurred while searching for applicants", error: error.message }));
  }
});

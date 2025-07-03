import { asyncHandler } from "../utils/asyncHandler.js";
import { validateFields } from "../utils/validator.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import promptText from "../utils/prompt.js";
import { parseResumeData } from "../utils/stringToJson.js";
import { applicant } from "../models/applicant.model.js";
import callGeminiAPI from "../utils/callGemini.js";
import downloadAndParsePDF from "../utils/pdfUtil.js";
import convertGoogleDriveUrl from "../utils/driveHandler.js";

// Upload resume
export const uploadResume = asyncHandler(async (req, res) => {
  let { url } = req.body;

  // Validate input
  validateFields({ url });
  url = convertGoogleDriveUrl(url);
  console.log("Resume URL:", url);

  const raw_text = await downloadAndParsePDF(url);
  // console.log("Downloaded content preview:", raw_text);
  if (!raw_text) {
    return res.status(500).json(new ApiResponse(500, "Error parsing PDF"));
  }
  // Generate and process content
  const prompt = promptText(raw_text);
  console.log("prompt:\n", prompt)
  const generatedContent = await callGeminiAPI(prompt);
  const resumeJson = parseResumeData(generatedContent);

  // Save applicant data
  const newUser = await applicant.create(resumeJson);
  console.log("Applicant data saved:", newUser);

  return res.status(200).json(new ApiResponse(200, "Resume processed and saved successfully", { generatedContent }));
});

// Search resume using name
export const searchResume = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Validate input
  validateFields({ name });

  const searchPattern = new RegExp(name, "i");
  try {
    const userFound = await applicant.find({ name: searchPattern });

    if (!userFound || userFound.length === 0) {
      return res.status(404).json(new ApiResponse(404, "No applicants found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Applicant data retrieved successfully", { TotalUsersFound: userFound.length, userFound })
      );
  } catch (error) {
    console.error("Error searching applicant data:", error);
    return res
      .status(404)
      .json(new ApiResponse(404, "Error occurred while searching for applicants", { error: error.message }));
  }
});

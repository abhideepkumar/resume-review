import { ApiError } from "./ApiError.js";
import axios from "axios";

const callGeminiAPI = async (prompt) => {
  const data = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });

    const generatedContent = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedContent) {
      throw new ApiError(500,"No content generated",generatedContent);
    }

    return generatedContent;
  } catch (error) {
    throw new ApiError(500, `Error processing with Gemini: ${error.message}`);
  }
};

export default callGeminiAPI;

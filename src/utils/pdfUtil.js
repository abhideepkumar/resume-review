import axios from "axios";
import pdfParser from "pdf2json";
import { ApiError } from "./ApiError.js";

const parsePDF = async (url) => {
  try {
    // Download the PDF file as a stream
    const response = await axios({ url, method: "GET", responseType: "arraybuffer" });
    const pdfData = new Uint8Array(response.data);

    // Parse the PDF file
    const pdfParserInstance = new pdfParser();

    return new Promise((resolve, reject) => {
      pdfParserInstance.on("pdfParser_dataError", (errData) =>
        reject(() => {
          throw new ApiError(400, "Error parsing PDF", errData.parserError);
        })
      );
      pdfParserInstance.on("pdfParser_dataReady", (pdfData) => {
        // Extract text from the PDF data
        const rawText = pdfData.Pages.map((page) =>
          page.Texts.map((text) => decodeURIComponent(text.R[0].T)).join(" ")
        ).join("\n");

        resolve(rawText.replace(/\s+/g, " ").trim());
      });

      pdfParserInstance.parseBuffer(pdfData);
    });
  } catch (error) {
    throw new ApiError(`Error parsing PDF: ${error.message}`);
  }
};

export default parsePDF;

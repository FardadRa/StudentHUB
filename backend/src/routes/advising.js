/**
 * src/routes/advising.js
 */
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const OpenAI = require("openai"); // from openai@4.x

/**
 * POST /api/advising/upload-pdf-base64
 * 1. Receive base64-encoded PDF
 * 2. Decode and save to temp file
 * 3. Parse text with pdf-parse
 * 4. Summarize with GPT
 * 5. Return summary + raw text
 */
router.post(
  "/upload-pdf-base64",
  // Route-specific limit of 50MB to avoid "PayloadTooLargeError"
  express.json({ limit: "50mb" }),
  async (req, res) => {
    try {
      // 1. Extract base64 + optional fileName from the request
      const { base64Pdf, fileName = "temp.pdf" } = req.body;

      if (!base64Pdf) {
        return res.status(400).json({
          success: false,
          error: "No base64Pdf provided in the request body.",
        });
      }

      // 2. Decode the base64 => buffer
      const fileBuffer = Buffer.from(base64Pdf, "base64");

      // 3. Write the file to a temp path in "uploads"
      const safeFileName = fileName.replace(/\s+/g, "_"); // remove spaces
      const tempFilePath = path.join("uploads", Date.now() + "-" + safeFileName);
      fs.writeFileSync(tempFilePath, fileBuffer);

      // 4. Parse PDF text
      const data = await pdfParse(fileBuffer);
      const pdfText = data.text;

      // 5. Summarize PDF content with GPT
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const prompt = `You are an academic advisor. The PDF text is:\n\n${pdfText}\n\nPlease provide a short summary of the PDF content and any important details that a student should know.`;

      const gptResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });

      const summary = gptResponse.choices[0].message.content.trim();

      // 6. Clean up: remove temp file
      fs.unlinkSync(tempFilePath);

      // 7. Return response
      res.json({ success: true, summary, pdfText });
    } catch (error) {
      console.error("Error in /upload-pdf-base64:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

/**
 * POST /api/advising/ask
 * Provide userQuestion + pdfText, get GPT answer
 * We'll do a snippet approach:
 *   1. Fetch official course data from fetchcourses route
 *   2. Attempt to find the relevant course(s)
 *   3. Send snippet + pdfText to GPT
 */
router.post("/ask", express.json(), async (req, res) => {
  try {
    const { userQuestion, pdfText = "" } = req.body;

    // Adjust the URL if your server or port is different
    // "http://localhost:5001/api/fetchcourses"
    // "https://studenthub-project.onrender.com/api/fetchcourses"
    const fetchcoursesURL =
      process.env.FETCH_COURSES_URL || "https://studenthub-project.onrender.com/api/fetchcourses";

    const fetchRes = await axios.get(fetchcoursesURL);
    if (!fetchRes.data.success) {
      throw new Error("Failed to fetch official course data from fetchcourses.");
    }

    const courseData = fetchRes.data.data; // The big JSON object with courses

    // Attempt to find "EECS ####"
    let codeMatch = userQuestion.match(/eecs\s+(\d+)/i);
    let relevantSnippet = "";

    if (codeMatch) {
      const code = codeMatch[1];
      console.log("Detected course code:", code);

      let found = null;
      Object.keys(courseData).forEach((level) => {
        courseData[level].forEach((arr) => {
          arr.forEach((courseObj) => {
            if (
              courseObj.key &&
              courseObj.key.dept.toLowerCase() === "eecs" &&
              courseObj.key.code === code
            ) {
              found = courseObj;
            }
          });
        });
      });

      if (found) {
        relevantSnippet = JSON.stringify(found);
      }
    }

    // Build the GPT prompt
    const prompt = `
You are an academic advisor with knowledge of the following official course data:
${relevantSnippet || "(No matching course found)"}

The student's PDF text (optional):
${pdfText}

User's question:
"${userQuestion}"

Please provide an academic advising response, referencing the data if it exists.
If no data was found, do your best with general knowledge but clarify that you have incomplete data.
`;
    // GPT call
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const answer = gptResponse.choices[0].message.content.trim();
    res.json({ success: true, answer });
  } catch (error) {
    console.error("Error in /ask:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

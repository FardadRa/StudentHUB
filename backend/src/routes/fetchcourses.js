const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

/**
 * GET /api/fetchcourses
 * Scrapes the page for 'course_boxes_json' and returns the data as JSON.
 */
router.get("/", async (req, res) => {
  try {
    // Fetch the HTML
    const url = "https://coursedelta.yorku.dev/graph/?dept=eecs";
    const response = await axios.get(url);
    const html = response.data;

    // Load HTML into cheerio
    const $ = cheerio.load(html);

    // Find the <script> content that has "var course_boxes_json = { ... };"
    // We'll store the result in coursesJson.
    let coursesJson = null;

    // Extract all script contents
    const allScripts = $("script")
      .map((i, el) => $(el).html())
      .get();

    // Look for the variable assignment in each script
    for (let scriptContent of allScripts) {
      // Use a regex to match something like:
      // var course_boxes_json = {...some JSON...};
      const match = scriptContent.match(
        /var\s+course_boxes_json\s*=\s*(\{[\s\S]*?\});/
      );
      if (match) {
        // match[1] is the JSON object string
        coursesJson = JSON.parse(match[1]);
        break;
      }
    }

    if (!coursesJson) {
      return res.status(404).json({
        success: false,
        error: "Could not find 'course_boxes_json' in the page."
      });
    }

    // 4️⃣ Return the extracted data
    res.json({ success: true, data: coursesJson });
  } catch (err) {
    console.error("fetchcourses error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

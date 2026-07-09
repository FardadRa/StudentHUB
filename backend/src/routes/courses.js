// src/routes/courses.js
const express = require("express");
const { addCourse, getCourses } = require("../db/queries");

const router = express.Router();

// GET /api/courses - Retrieve all courses
router.get("/", async (req, res) => {
  try {
    const courses = await getCourses();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/courses - Add a new course
router.post("/", async (req, res) => {
  try {
    // Expecting JSON in the body: { name, day, time, professor, room }
    const newCourse = await addCourse(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

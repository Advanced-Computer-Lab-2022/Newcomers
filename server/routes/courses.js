const express = require("express");

const { getCourse, getCourses } = require("../controllers/courseController");

const router = express.Router();

// GET all Courses
router.get("/", getCourses);

// GET a course
router.get("/:id", getCourse);

module.exports = router;

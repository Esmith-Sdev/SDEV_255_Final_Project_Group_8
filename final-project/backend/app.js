//Initalization
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
require("../backend/db");
const bodyParser = require("body-parser");
const Course = require("./models/course");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const router = express.Router();
const Student = require("./models/student");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get("/", (req, res) => {
  res.send("Server Running");
});

//Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// --- Courses (teacher) ---
app.post("/api/courses", async (req, res) => {
  try {
    const saved = await Course.create(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Create Student with thunderclient
app.post("/api/students", async (req, res) => {
  try {
    const saved = await Student.create(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a course
app.put("/api/courses/:id", async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Ensure we have a default student in no-login mode
async function getDefaultStudent() {
  let student = await Student.findOne();
  if (!student) {
    student = await Student.create({
      name: "Default Student",
      email: "default@example.com",
      myClasses: [],
    });
  }
  return student;
}

// Get all classes for the default student
app.get("/api/myclasses", async (req, res) => {
  try {
    const student = await getDefaultStudent();
    await student.populate("myClasses");
    res.json(student.myClasses || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Enroll in a course (add to default student's myClasses)
app.post("/api/myclasses", async (req, res) => {
  try {
    const { courseId } = req.body;
    const student = await getDefaultStudent();
    const exists = student.myClasses.some((id) => id.toString() === courseId);
    if (!exists) {
      student.myClasses.push(courseId);
      await student.save();
    }
    await student.populate("myClasses");
    res.json(student.myClasses); // return updated list
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Drop a course
app.delete("/api/myclasses/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const student = await getDefaultStudent();
    student.myClasses = student.myClasses.filter(
      (id) => id.toString() !== courseId
    );
    await student.save();
    await student.populate("myClasses");
    res.json(student.myClasses); // return updated list
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

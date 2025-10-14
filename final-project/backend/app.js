//Initalization
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = "7d";

require("../backend/db");
const bodyParser = require("body-parser");
const Course = require("./models/course");
const User = require("./models/user");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const router = express.Router();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

router.post("/signup", async (req, res) => {
  try {
    let { username, password, isTeacher } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and Password Required" });
    }

    username = String(username).toLowerCase().trim();
    const existed = await User.findOne({ username });
    if (existed) return res.status(409).json({ message: "Username taken" });

    const passwordHash = await bcrypt.hash(String(password), 12);
    const role = isTeacher ? "teacher" : "student";

    const user = await User.create({ username, passwordHash, role });

    const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Keep professor-style fields AND add role
    return res.status(201).json({
      token,
      role: user.role,
      username2: user.username, // professor’s field name
      auth: 1, // flag like your prof did
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Signup failed", error: err.message });
  }
});

// POST /api/auth/  (login — matches your frontend)
router.post("/", async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and Password Required" });
    }

    const user = await User.findOne({
      username: String(username).toLowerCase().trim(),
    }).select("+passwordHash");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.json({
      token,
      role: user.role,
      username2: user.username, // professor’s field name
      auth: 1, // professor-style flag
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Login failed", error: err.message });
  }
});

// mount the auth router HERE (this yields /api/auth/*)
app.use("/api/auth", router);

// health
app.get("/", (req, res) => res.send("Server Running"));
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

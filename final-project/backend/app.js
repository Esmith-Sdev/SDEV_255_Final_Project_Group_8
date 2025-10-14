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

    return res.status(201).json({
      token,
      role: user.role,
      username2: user.username,
      auth: 1,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Signup failed", error: err.message });
  }
});

// POST /api/auth/
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
      username2: user.username,
      auth: 1,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Login failed", error: err.message });
  }
});

app.use("/api/auth", router);

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
//Courses (teacher)
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/courses", async (req, res) => {
  try {
    const saved = await Course.create(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

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
//Get a students classes
app.get("/api/students/:id/myclasses", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("myClasses");
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student.myClasses || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Add course to students classes
app.post("/api/students/:id/myclasses", async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ error: "courseId required" });

    const [student, course] = await Promise.all([
      Student.findById(req.params.id),
      Course.findById(courseId),
    ]);
    if (!student) return res.status(404).json({ error: "Student not found" });
    if (!course) return res.status(404).json({ error: "Course not found" });

    // prevent duplicates
    if (!student.myClasses.some((id) => id.toString() === courseId)) {
      student.myClasses.push(courseId);
      await student.save();
    }
    await student.populate("myClasses");
    res.status(200).json(student.myClasses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Drop a course
app.delete("/api/students/:id/myclasses/:courseId", async (req, res) => {
  try {
    const { id, courseId } = req.params;
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    student.myClasses = student.myClasses.filter(
      (cid) => cid.toString() !== courseId
    );
    await student.save();
    await student.populate("myClasses");
    res.json(student.myClasses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

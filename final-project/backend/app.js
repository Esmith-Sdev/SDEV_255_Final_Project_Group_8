//Initalization
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
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
app.post("/api/courses", async (req, res) => {
  try {
    const saved = await Course.create(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

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

// Get all classes for the student
app.get("/api/users/:userId/myclasses", async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const user = await User.findById(userId).populate("myClasses");
    res.json(user.myClasses || []);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.myClasses = user.myClasses.filter(
      (id) => String(id) !== String(courseId)
    );
    await user.save();
    await user.populate("myClasses");
    res.json(user.myClasses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Drop a course
app.delete("/api/users/:userId/myclasses/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.myClasses = user.myClasses.filter(
      (id) => String(id) !== String(courseId)
    );

    await user.save();
    await user.populate("myClasses");
    res.json(user.myClasses);
  } catch (err) {
    console.error("Drop failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// Add course to cart
app.post("/api/users/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  const { courseId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.cart.map(String).includes(String(courseId))) {
    return res.status(409).json({ message: "Already in cart" });
  }

  user.cart.push(courseId);
  await user.save();
  res.status(201).json({ cart: user.cart });
});

// Get student cart
app.get("/api/users/:userId/cart", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("cart");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error retrieving cart", error: err.message });
  }
});

// Remove specific course from cart
app.delete("/api/users/:userId/cart/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter((id) => String(id) !== String(courseId));
    await user.save();
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error removing from cart", error: err.message });
  }
});

// Checkout
app.post("/api/users/:userId/cart/checkout", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("+cart +myClasses");
    if (!user) return res.status(404).json({ message: "User not found" });

    const merged = new Set([
      ...user.myClasses.map(String),
      ...user.cart.map(String),
    ]);
    user.myClasses = Array.from(merged);
    user.cart = [];
    await user.save();
    await user.populate("myClasses");
    return res.json({ myClasses: user.myClasses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
});

//Teacher deletes a course
app.delete("/api/courses/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const removed = await Course.findByIdAndDelete(courseId);
    if (!removed) return res.status(404).json({ error: "Not found" });

    await User.updateMany(
      {},
      {
        $pull: {
          myClasses: courseId,
          cart: courseId,
        },
      }
    );
    return res.status(204).end();
  } catch (err) {
    console.error("Delete course failed:", err);
    res.status(500).json({ error: err.message });
  }
});

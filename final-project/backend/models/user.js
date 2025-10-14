const mongoose = require("mongoose");
const db = require("../db.js");

const UserSchema = new db.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    required: true,
    default: "student",
  },
  passwordHash: { type: String, required: true, select: false }, // ← match app.js

  myClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const User = db.model("User", UserSchema);
module.exports = User;

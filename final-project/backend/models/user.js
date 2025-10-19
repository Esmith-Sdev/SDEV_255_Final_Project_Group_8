const db = require("../db.js");

const userSchema = new db.Schema({
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
  passwordHash: { type: String, required: true, select: false },
  myClasses: [{ type: db.Schema.Types.ObjectId, ref: "Course" }],
  cart: [{ type: db.Schema.Types.ObjectId, ref: "Course" }],
});

const User = db.model("User", userSchema);
module.exports = User;

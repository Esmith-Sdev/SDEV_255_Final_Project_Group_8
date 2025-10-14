const db = require("../db.js");
const Course = db.model("Course", {
  subject: { type: String, required: true },
  course: { type: String, required: true },
  info: { type: String, required: true },
  credits: { type: Number, required: true, min: 0, max: 6 },
  teacher: {
    type: db.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = Course;

const db = require("../backend/db");
const Course = db.model("Course", {
  subject: { type: String, required: true },
  course: { type: String, required: true },
  info: { type: String, required: true },
  credits: { type: Number, required: true, min: 0, max: 6 },
});
module.exports = Course;

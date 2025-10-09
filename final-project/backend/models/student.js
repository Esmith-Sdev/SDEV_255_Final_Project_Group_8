const db = require("../db.js");

const studentSchema = new db.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  myClasses: [
    {
      type: db.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Student = db.model("Student", studentSchema);

module.exports = Student;

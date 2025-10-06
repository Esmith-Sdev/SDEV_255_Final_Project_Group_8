//Initalization
require("dotenv").config();
const express = require("express");
var cors = require("cors");
require("../backend/db");
const bodyParser = require("body-parser");
const Course = require("./models/course");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const router = express.Router();

//Connect to the Database using the MONGODB URI
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

//Listen on port 3000 for local testing
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);

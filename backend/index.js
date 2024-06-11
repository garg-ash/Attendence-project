import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const port = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

mongoose
  .connect("mongodb://127.0.0.1:27017/attendance")
  .then(() => app.listen(port, () => console.log("server started at port " + port)))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

let d = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: d,
  },
  attendance: {
    type: Object,
    required: true,
  },
});

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    default: () => Date.now(),
  },
});

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: () => Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  aadhar: {
    type: Number,
    required: true,
  },
});

const attendanceModel = mongoose.model("record", attendanceSchema, "record");
const facultyModel = mongoose.model("faculty", facultySchema, "faculty");
const studentModel = mongoose.model("student", studentSchema, "student");

// Save Attendance
app.post("/saveAttendance", (req, res) => {
  const dataToSave = new attendanceModel(req.body);
  dataToSave
    .save()
    .then((response) => res.send(response))
    .catch((error) => {
      console.log(error);
      res.send(false);
    });
});

// Get Students by Faculty
app.get("/getStudentsByFaculty/:facultyName", async (req, res) => {
  const facultyName = req.params.facultyName;
  try {
    const students = await studentModel.find({ faculty: facultyName }).select("-__v");
    if (students.length > 0) {
      res.json(students);
    } else {
      res.json({ message: "No students found for this faculty" });
    }
  } catch (error) {
    console.error("Error", error);
    res.json({ message: "Error occurred" });
  }
});

// Get all Faculty
app.get("/getFaculty", async (req, res) => {
  const facultyList = await facultyModel.find({}).select("-__v");
  if (facultyList) res.json(facultyList);
  else res.json(false);
});

// Save Faculty
app.post("/saveFaculty", async (req, res) => {
  const dataToSave = new facultyModel(req.body);
  dataToSave
    .save()
    .then((response) => res.json(response))
    .catch((error) => {
      console.log(error);
      res.send(false);
    });
});

// Get all Students
app.get("/getStudent", async (req, res) => {
  const studentList = await studentModel.find({}).select("-__v");
  if (studentList) res.json(studentList);
  else res.json(false);
});

// Save Student
app.post("/saveStudent", async (req, res) => {
  const dataToSave = new studentModel(req.body);
  dataToSave
    .save()
    .then((response) => res.json(response))
    .catch((error) => {
      console.log(error);
      res.send(false);
    });
});

// Save Multiple Students
app.post("/saveMultipleStudents", async (req, res) => {
  try {
    const students = req.body;
    const response = await studentModel.insertMany(students);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

// Delete Student by ID
app.delete("/deleteStudent/:id", async (req, res) => {
  const idToDelete = req.params.id;
  try {
    const deletedStudent = await studentModel.findOneAndDelete({ id: idToDelete });
    if (deletedStudent) res.json("Student Deleted");
    else res.json(false);
  } catch (error) {
    console.error("Error", error);
    res.json(false);
  }
});

// Delete Faculty by ID
app.delete("/deleteFaculty/:id", async (req, res) => {
  const idToDelete = req.params.id;
  try {
    const deletedFaculty = await facultyModel.findOneAndDelete({ _id: idToDelete });
    if (deletedFaculty) {
      res.json("Faculty Deleted");
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error("Error", error);
    res.json(false);
  }
});

// Automatically save initial data
// const initialFaculties = [
//   { name: "Rohit Jain" },
//   { name: "Somesh Devra" },
// ];

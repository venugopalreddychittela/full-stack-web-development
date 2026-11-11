require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));

// Student Schema & Model
const studentSchema = new mongoose.Schema(
  {
    rollNo: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    semester: { type: Number, required: true, min: 1, max: 8 },
    gpa: { type: Number, required: true, min: 0.0, max: 10.0 },
    email: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

// Indexes
studentSchema.index({ department: 1 });

const Student = mongoose.model("Student", studentSchema);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Student Management System API is running" });
});

// Q4 (b) Retrieve all student records (Read)
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ rollNo: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Unable to retrieve student records", error: err.message });
  }
});

// Q4 (a) Insert a student record (Create)
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: "Failed to create student record", error: err.message });
  }
});

// Q4 (c) Update a student's department / details (Update)
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ message: "Student record not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Failed to update student record", error: err.message });
  }
});

// Dedicated endpoint to update student's department specifically by rollNo
app.patch("/api/students/:rollNo/department", async (req, res) => {
  try {
    const { department } = req.body;
    if (!department) {
      return res.status(400).json({ message: "Department is required" });
    }
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      { $set: { department } },
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ message: "Student not found with roll number " + req.params.rollNo });
    res.json({ message: "Department updated successfully", student });
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

// Q4 (d) Delete a student record (Delete)
app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student record not found" });
    res.json({ message: "Student record deleted successfully", student });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete student record", error: err.message });
  }
});

// Aggregation endpoint: Department-wise summary
app.get("/api/reports/department-summary", async (req, res) => {
  try {
    const summary = await Student.aggregate([
      {
        $group: {
          _id: "$department",
          studentCount: { $sum: 1 },
          averageGpa: { $avg: "$gpa" },
          highestGpa: { $max: "$gpa" },
          lowestGpa: { $min: "$gpa" }
        }
      },
      { $sort: { studentCount: -1 } }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: "Unable to generate department summary", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/student_mgmt_db";
    const dbName = process.env.DB_NAME || "student_mgmt_db";
    await mongoose.connect(mongoUri, { dbName });
    console.log(`Connected to MongoDB database: ${dbName}`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}

module.exports = app;

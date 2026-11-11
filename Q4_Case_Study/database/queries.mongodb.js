/**
 * ============================================================================
 * COURSE: Full-Stack Web Development / Web App Architecture & Cloud Deployment
 * STUDENT ROLL NO: A24126552078
 * QUESTION NUMBER: 4
 * 
 * TASK:
 * Write MongoDB queries to perform the following operations on a students collection:
 * (a) Insert a student record
 * (b) Retrieve all student records
 * (c) Update a student's department
 * (d) Delete a student record
 * ============================================================================
 */

// 1. Switch to / Create Database
use student_mgmt_db;

// 2. Explicitly Create the 'students' Collection
db.createCollection("students");

// ----------------------------------------------------------------------------
// QUESTION 4 (a): Insert a student record
// ----------------------------------------------------------------------------
// Inserting a single student record with user's roll number and details:
db.students.insertOne({
  rollNo: "A24126552078",
  name: "Venugopal R",
  department: "Computer Science and Engineering",
  semester: 5,
  gpa: 8.85,
  email: "venugopal.a24126552078@college.edu"
});

// Inserting additional initial seed records for testing and aggregation:
db.students.insertMany([
  {
    rollNo: "A24126552070",
    name: "Aditya Sharma",
    department: "Computer Science and Engineering",
    semester: 5,
    gpa: 9.10,
    email: "aditya.sharma@college.edu"
  },
  {
    rollNo: "A24126552071",
    name: "Bhavana Patel",
    department: "Information Technology",
    semester: 5,
    gpa: 8.40,
    email: "bhavana.patel@college.edu"
  },
  {
    rollNo: "A24126552072",
    name: "Chirag Verma",
    department: "Electronics and Communication",
    semester: 5,
    gpa: 7.95,
    email: "chirag.verma@college.edu"
  },
  {
    rollNo: "A24126552073",
    name: "Divya Nair",
    department: "Computer Science and Engineering",
    semester: 5,
    gpa: 9.30,
    email: "divya.nair@college.edu"
  },
  {
    rollNo: "A24126552074",
    name: "Eshwar Reddy",
    department: "Information Technology",
    semester: 5,
    gpa: 8.15,
    email: "eshwar.reddy@college.edu"
  }
]);

// ----------------------------------------------------------------------------
// QUESTION 4 (b): Retrieve all student records
// ----------------------------------------------------------------------------
// Basic retrieval of all documents:
db.students.find({});

// Formatted / Pretty retrieval sorted by roll number:
db.students.find({}).sort({ rollNo: 1 }).pretty();

// Additional selective queries:
// Retrieve students belonging to "Computer Science and Engineering"
db.students.find({ department: "Computer Science and Engineering" });

// Retrieve students with GPA >= 8.5
db.students.find({ gpa: { $gte: 8.5 } });

// Count total students in collection
db.students.countDocuments({});

// ----------------------------------------------------------------------------
// QUESTION 4 (c): Update a student's department
// ----------------------------------------------------------------------------
// Update department of student with roll number 'A24126552078' to 'Artificial Intelligence & Data Science'
db.students.updateOne(
  { rollNo: "A24126552078" },
  { 
    $set: { 
      department: "Artificial Intelligence & Data Science",
      updatedAt: new Date()
    } 
  }
);

// Verify the update:
db.students.find({ rollNo: "A24126552078" });

// ----------------------------------------------------------------------------
// QUESTION 4 (d): Delete a student record
// ----------------------------------------------------------------------------
// Delete the student record with roll number 'A24126552074'
db.students.deleteOne({ rollNo: "A24126552074" });

// Verify deletion:
db.students.find({ rollNo: "A24126552074" }); // Returns null/empty

// ----------------------------------------------------------------------------
// RUBRIC COMPONENT 4: Indexing and Aggregation Pipeline
// ----------------------------------------------------------------------------

// 1. Index Creation:
// Unique index on rollNo to prevent duplicate enrollment
db.students.createIndex({ rollNo: 1 }, { unique: true });

// Secondary index on department to optimize filtering and lookups
db.students.createIndex({ department: 1 });

// View all indexes on the collection
db.students.getIndexes();

// 2. Department-wise Aggregation:
// Aggregates student count, average GPA, max GPA, and min GPA per department
db.students.aggregate([
  {
    $group: {
      _id: "$department",
      studentCount: { $sum: 1 },
      averageGPA: { $avg: "$gpa" },
      maxGPA: { $max: "$gpa" },
      minGPA: { $min: "$gpa" }
    }
  },
  {
    $sort: { studentCount: -1 }
  }
]);

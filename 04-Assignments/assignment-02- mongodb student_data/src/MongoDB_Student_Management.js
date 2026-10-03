use collegeDB

db.createCollection("students")

db.students.insertMany([
    {
        rollNo: "23CM001",
        name: "Ravi Kumar",
        branch: "CSE-AIML",
        year: 3,
        marks: 85,
        email: "ravi@example.com"
    },
    {
        rollNo: "23CM002",
        name: "Anita Sharma",
        branch: "CSE",
        year: 2,
        marks: 92,
        email: "anita@example.com"
    },
    {
        rollNo: "23CM003",
        name: "Kiran Reddy",
        branch: "ECE",
        year: 3,
        marks: 68,
        email: "kiran@example.com"
    },
    {
        rollNo: "23CM004",
        name: "Priya Singh",
        branch: "CSE-AIML",
        year: 4,
        marks: 45,
        email: "priya@example.com"
    },
    {
        rollNo: "23CM005",
        name: "Arjun Rao",
        branch: "IT",
        year: 2,
        marks: 78,
        email: "arjun@example.com"
    }
])

// Display all students
db.students.find()

// Students from CSE-AIML
db.students.find({ branch: "CSE-AIML" })

// Students scoring above 75
db.students.find({ marks: { $gt: 75 } })

// Search by roll number
db.students.findOne({ rollNo: "23CM001" })

// Search by year
db.students.find({ year: 3 })

// Search by marks
db.students.find({ marks: { $gte: 80 } })

// Update marks
db.students.updateOne(
    { rollNo: "23CM001" },
    { $set: { marks: 90 } }
)

// Update email
db.students.updateOne(
    { rollNo: "23CM003" },
    { $set: { email: "kiran.reddy@example.com" } }
)

// Delete using roll number
db.students.deleteOne({ rollNo: "23CM005" })

// Sort by marks descending
db.students.find().sort({ marks: -1 })

// Create index
db.students.createIndex({ rollNo: 1 })

// Display indexes
db.students.getIndexes()

// Demonstrate index usage
db.students.find({ rollNo: "23CM001" }).explain("executionStats")

// Real-time extension
db.students.find({ marks: { $gt: 80 } })

db.students.find({ marks: { $lt: 50 } })

db.students.find().sort({ marks: -1 }).limit(1)

db.students.find({ branch: "CSE-AIML" })

db.students.find().sort({ marks: 1 })
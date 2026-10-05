// MongoDB CRUD Operations
// Experiment 9: Student Management System

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "collegeDB";

async function main() {

    try {

        // Connect to MongoDB
        await client.connect();

        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const students = db.collection("students");

        // -------------------------------
        // CREATE - Insert Student Records
        // -------------------------------

        await students.deleteMany({});

        const studentData = [
            {
                rollNo: "23CM001",
                name: "Ravi Kumar",
                branch: "CSE",
                year: 3,
                marks: 85
            },
            {
                rollNo: "23CM002",
                name: "Priya Sharma",
                branch: "AIML",
                year: 3,
                marks: 91
            },
            {
                rollNo: "23CM003",
                name: "Kiran Kumar",
                branch: "CSE",
                year: 3,
                marks: 78
            },
            {
                rollNo: "23CM004",
                name: "Anil Kumar",
                branch: "CSE",
                year: 3,
                marks: 88
            },
            {
                rollNo: "23CM005",
                name: "Sneha Reddy",
                branch: "AIML",
                year: 3,
                marks: 94
            }
        ];

        const insertResult = await students.insertMany(studentData);

        console.log("\nCREATE Operation");
        console.log(
            `${insertResult.insertedCount} student records inserted successfully.`
        );


        // -------------------------------
        // READ - Display All Students
        // -------------------------------

        console.log("\nREAD Operation");

        const allStudents = await students.find().toArray();

        console.log(allStudents);


        // -------------------------------
        // READ - Find One Student
        // -------------------------------

        console.log("\nFind Student 23CM002");

        const student = await students.findOne({
            rollNo: "23CM002"
        });

        console.log(student);


        // -------------------------------
        // READ - Students with Marks > 80
        // -------------------------------

        console.log("\nStudents with marks greater than 80");

        const highScorers = await students.find({
            marks: { $gt: 80 }
        }).toArray();

        console.log(highScorers);


        // -------------------------------
        // UPDATE - Update Student Marks
        // -------------------------------

        console.log("\nUPDATE Operation");

        const updateResult = await students.updateOne(
            {
                rollNo: "23CM003"
            },
            {
                $set: {
                    marks: 84
                }
            }
        );

        console.log(
            `Matched: ${updateResult.matchedCount}`
        );

        console.log(
            `Modified: ${updateResult.modifiedCount}`
        );


        // -------------------------------
        // DELETE - Delete Student
        // -------------------------------

        console.log("\nDELETE Operation");

        const deleteResult = await students.deleteOne({
            rollNo: "23CM004"
        });

        console.log(
            `Deleted: ${deleteResult.deletedCount}`
        );


        // -------------------------------
        // FINAL RECORDS
        // -------------------------------

        console.log("\nFinal Student Records");

        const finalStudents = await students.find().toArray();

        console.log(finalStudents);

    }

    catch (error) {

        console.error("Error:", error);

    }

    finally {

        await client.close();

        console.log("\nMongoDB connection closed.");

    }
}

main();

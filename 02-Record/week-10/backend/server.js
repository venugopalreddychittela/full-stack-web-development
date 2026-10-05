const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

const PORT = 5000;
const MONGO_URL = "mongodb://localhost:27017";
const DB_NAME = "collegeDB";

app.use(cors());
app.use(express.json());

let studentsCollection;

// Connect to MongoDB
async function connectDatabase() {

    const client = new MongoClient(MONGO_URL);

    await client.connect();

    console.log("Connected to MongoDB");

    const database = client.db(DB_NAME);

    studentsCollection = database.collection("students");
}

// GET: Display all students
app.get("/students", async (req, res) => {

    try {

        const students = await studentsCollection
            .find()
            .toArray();

        res.json(students);

    } catch (error) {

        res.status(500).json({
            message: "Error retrieving students"
        });

    }
});


// POST: Add a student
app.post("/students", async (req, res) => {

    try {

        const student = {
            name: req.body.name,
            branch: req.body.branch,
            marks: Number(req.body.marks)
        };

        const result =
            await studentsCollection.insertOne(student);

        res.status(201).json({
            message: "Student added successfully",
            id: result.insertedId
        });

    } catch (error) {

        res.status(500).json({
            message: "Error adding student"
        });

    }
});


// PUT: Update a student
app.put("/students/:id", async (req, res) => {

    try {

        const id = new ObjectId(req.params.id);

        const updatedStudent = {
            name: req.body.name,
            branch: req.body.branch,
            marks: Number(req.body.marks)
        };

        const result =
            await studentsCollection.updateOne(
                { _id: id },
                { $set: updatedStudent }
            );

        res.json({
            message: "Student updated successfully",
            modifiedCount: result.modifiedCount
        });

    } catch (error) {

        res.status(500).json({
            message: "Error updating student"
        });

    }
});


// DELETE: Delete a student
app.delete("/students/:id", async (req, res) => {
    try {

        const id = new ObjectId(req.params.id);

        const result =
            await studentsCollection.deleteOne({
                _id: id
            });

        res.json({
            message: "Student deleted successfully",
            deletedCount: result.deletedCount
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting student"
        });

    }
});


// Start server after connecting to MongoDB
connectDatabase()
    .then(() => {

        app.listen(PORT, () => {

            console.log(
                `Server running at http://localhost:${PORT}`
            );

        });

    })
    .catch(error => {

        console.error(
            "Unable to connect to MongoDB:",
            error
        );

    });

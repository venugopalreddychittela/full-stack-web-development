const express = require("express");

const app = express();

const PORT = 3000;

// Home route
app.get("/", function (req, res) {
    res.send("<h1>Welcome to Student Server</h1>");
});

// Students route
app.get("/students", function (req, res) {

    const students = [
        { id: 1, name: "Venu" },
        { id: 2, name: "Rahul" },
        { id: 3, name: "Akash" },
        { id: 4, name: "Priya" },
        { id: 5, name: "Anjali" }
    ];

    res.json(students);
});

// About route
app.get("/about", function (req, res) {
    res.send(`
        <h1>About</h1>
        <p>This is a basic Express.js Student Server.</p>
        <p>It demonstrates routing and HTTP GET requests.</p>
    `);
});

// Start the server
app.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}`);
});
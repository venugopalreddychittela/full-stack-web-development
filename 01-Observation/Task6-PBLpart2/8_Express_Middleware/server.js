// Q8: Express.js Middleware Demonstration
// Demonstrating middleware and the request-response cycle

const express = require("express");

const app = express();

const PORT = 3000;


// ==================================================
// MIDDLEWARE 1: LOGGING MIDDLEWARE
// ==================================================

// Middleware receives three parameters:
// req  -> request object
// res  -> response object
// next -> function used to pass control
//         to the next middleware or route

function logger(req, res, next) {

    const currentTime = new Date().toLocaleTimeString();

    console.log("--------------------------------");
    console.log("Request received");
    console.log("Time:", currentTime);
    console.log("Method:", req.method);
    console.log("URL:", req.url);

    // Pass control to the next middleware/route
    next();
}


// Register the logging middleware
app.use(logger);


// ==================================================
// MIDDLEWARE 2: REQUEST INFORMATION
// ==================================================

// This middleware displays additional information
// about the incoming request.

app.use((req, res, next) => {

    console.log("Request is being processed...");

    // Continue to the requested route
    next();
});


// ==================================================
// ROUTE 1: HOME
// ==================================================

app.get("/", (req, res) => {

    console.log("Home route executed");

    res.send(`
        <h1>Express.js Middleware Demo</h1>
        <p>Welcome to the Express server.</p>
        <p>Logging middleware executed successfully.</p>
    `);
});


// ==================================================
// ROUTE 2: STUDENTS
// ==================================================

app.get("/students", (req, res) => {

    console.log("Students route executed");

    const students = [
        {
            name: "Venu",
            rollNumber: "A24126552078",
            branch: "CSM"
        },
        {
            name: "Rahul",
            rollNumber: "A24126552079",
            branch: "CSE"
        },
        {
            name: "Priya",
            rollNumber: "A24126552080",
            branch: "ECE"
        }
    ];

    res.json(students);
});


// ==================================================
// ROUTE 3: ABOUT
// ==================================================

app.get("/about", (req, res) => {

    console.log("About route executed");

    res.send(`
        <h1>About Application</h1>
        <p>This application demonstrates Express.js middleware.</p>
        <p>A logging middleware records every incoming request.</p>
    `);
});


// ==================================================
// ROUTE 4: POST REQUEST
// ==================================================

app.post("/message", (req, res) => {

    console.log("POST /message route executed");

    res.send("POST request received successfully.");
});


// ==================================================
// 404 MIDDLEWARE
// ==================================================

// This middleware executes when no route matches
// the requested URL.

app.use((req, res) => {

    console.log("Route not found");

    res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <p>The requested route does not exist.</p>
    `);
});


// ==================================================
// START THE SERVER
// ==================================================

app.listen(PORT, () => {

    console.log("================================");
    console.log("Express server started");
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("================================");
});
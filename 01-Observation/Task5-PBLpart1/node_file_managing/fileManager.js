const fs = require("fs");
const readline = require("readline");

// Create an interface for taking input from the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask the user for a filename
rl.question("Enter filename: ", function (filename) {

    // Ask the user for initial content
    rl.question("Enter content: ", function (content) {

        // Create/write the file
        fs.writeFile(filename, content, function (err) {
            if (err) {
                console.log("Error writing file:", err);
                rl.close();
                return;
            }

            console.log("File created successfully.");

            // Read the file
            fs.readFile(filename, "utf8", function (err, data) {
                if (err) {
                    console.log("Error reading file:", err);
                    rl.close();
                    return;
                }

                console.log("\nInitial file content:");
                console.log(data);

                // Ask for additional content
                rl.question("\nEnter additional content: ", function (additionalContent) {

                    // Append content to the file
                    fs.appendFile(filename, "\n" + additionalContent, function (err) {
                        if (err) {
                            console.log("Error appending file:", err);
                            rl.close();
                            return;
                        }

                        console.log("Content appended successfully.");

                        // Read and display the final content
                        fs.readFile(filename, "utf8", function (err, finalData) {
                            if (err) {
                                console.log("Error reading final file:", err);
                                rl.close();
                                return;
                            }

                            console.log("\nFinal file content:");
                            console.log(finalData);

                            rl.close();
                        });
                    });
                });
            });
        });
    });
});
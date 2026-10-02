// Q7: NPM and package.json Demonstration
// Demonstrating two external NPM packages:
// 1. validator
// 2. lodash

// Importing external packages
const validator = require("validator");
const _ = require("lodash");


// ==================================================
// PART 1: NPM PACKAGE INFORMATION
// ==================================================

console.log("========== NPM PACKAGE DEMONSTRATION ==========");

console.log("Package 1: validator");
console.log("Package 2: lodash");

console.log("Both packages were installed using NPM.");


// ==================================================
// PART 2: VALIDATOR PACKAGE
// ==================================================

// validator is used to validate strings such as
// email addresses, URLs, numbers, etc.

console.log("\n========== VALIDATOR PACKAGE ==========");


// Valid email test
const validEmail = "venu@example.com";

console.log("Email:", validEmail);
console.log(
    "Is Valid Email:",
    validator.isEmail(validEmail)
);


// Invalid email test
const invalidEmail = "venu@";

console.log("\nEmail:", invalidEmail);
console.log(
    "Is Valid Email:",
    validator.isEmail(invalidEmail)
);


// URL validation
const website = "https://www.example.com";

console.log("\nWebsite:", website);
console.log(
    "Is Valid URL:",
    validator.isURL(website)
);


// ==================================================
// PART 3: LODASH PACKAGE
// ==================================================

// lodash provides useful functions for working
// with arrays and objects.

console.log("\n========== LODASH PACKAGE ==========");

const numbers = [10, 20, 30, 40, 50];

console.log("Original Array:", numbers);


// Calculate sum
console.log("Sum:", _.sum(numbers));


// Find maximum value
console.log("Maximum:", _.max(numbers));


// Find minimum value
console.log("Minimum:", _.min(numbers));


// Calculate average
const average = _.sum(numbers) / numbers.length;

console.log("Average:", average);


// ==================================================
// PART 4: LODASH ARRAY OPERATION
// ==================================================

const studentNames = [
    "Venu",
    "Rahul",
    "Priya",
    "Anil"
];

console.log("\nStudent Names:", studentNames);

// Reverse the array
const reversedNames = _.reverse([...studentNames]);

console.log("Reversed Names:", reversedNames);


// ==================================================
// PART 5: FINAL RESULT
// ==================================================

console.log("\n========== PROGRAM COMPLETED ==========");

console.log(
    "validator and lodash packages were successfully used."
);
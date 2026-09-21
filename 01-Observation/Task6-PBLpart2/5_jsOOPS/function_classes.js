// Q5: Difference between JavaScript Functions and Classes
//                 Student Class
//                 /     |      \
//                /      |       \
//               ↓       ↓        ↓
//          student1  student2  student3
//            Venu      Rahul     Priya
//            CSM       CSE       ECE

// --------------------------------------------------
// PART 1: JavaScript Function
// --------------------------------------------------

// A function is a reusable block of code.
// It performs a specific task.

function greetStudent(name) {
    return "Hello, " + name + "!";
}

// Calling the function
console.log("FUNCTION EXAMPLE");
console.log(greetStudent("Venu"));
console.log(greetStudent("Rahul"));


// --------------------------------------------------
// PART 2: JavaScript Class
// --------------------------------------------------

// A class is a blueprint for creating objects.
// It contains properties and methods.

class Student {

    // Constructor initializes the properties
    constructor(name, rollNumber, branch) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.branch = branch;
    }

    // Method to display student details
    displayDetails() {
        console.log("Name:", this.name);
        console.log("Roll Number:", this.rollNumber);
        console.log("Branch:", this.branch);
        console.log("-------------------------");
    }
}


// --------------------------------------------------
// PART 3: Creating Multiple Objects
// --------------------------------------------------

// Creating the first object
const student1 = new Student(
    "Venu",
    "A24126552078",
    "CSM"
);

// Creating the second object
const student2 = new Student(
    "Rahul",
    "A24126552079",
    "CSE"
);

// Creating the third object
const student3 = new Student(
    "Priya",
    "A24126552080",
    "ECE"
);


// --------------------------------------------------
// PART 4: Calling the Common Method
// --------------------------------------------------

console.log("\nCLASS OBJECTS");

student1.displayDetails();
student2.displayDetails();
student3.displayDetails();
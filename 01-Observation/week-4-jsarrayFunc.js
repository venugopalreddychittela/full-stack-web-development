// Create an array
let marks = [75, 82, 68, 90, 85];
console.log("Original Array:", marks);
// 1. Length
console.log("Number of Elements:", marks.length);
// 2. Accessing Array Elements
console.log("First Mark:", marks[0]);
console.log("Third Mark:", marks[2]);
console.log("Last Mark:", marks[marks.length - 1]);
// 3. Changing an Element
marks[2] = 72;
console.log("After Changing Third Element:", marks);
// 4. push() - Add element at the end
marks.push(95);
console.log("After push():", marks);
// 5. pop() - Remove last element
marks.pop();
console.log("After pop():", marks);
// 6. unshift() - Add element at the beginning
marks.unshift(70);
console.log("After unshift():", marks);
// 7. shift() - Remove first element
marks.shift();
console.log("After shift():", marks);

// Function to display all elements
function showMarks(arr) {
    console.log("Student Marks:");

    for (let i = 0; i < arr.length; i++) {
        console.log("Mark", i + 1, ":", arr[i]);
    }
}
// Function to find the highest mark
function findHighest(arr) {
    let highest = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > highest) {
            highest = arr[i];
        }
    }

    return highest;
}
// Function to find the lowest mark
function findLowest(arr) {
    let lowest = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < lowest) {
            lowest = arr[i];
        }
    }

    return lowest;
}
// Arrow function without parameters
const welcome = () => {
    console.log("Welcome to JavaScript Arrays");
};
welcome();
// Arrow function with one parameter
const double = value => value * 2;

console.log("Double of 15:", double(15));
// Arrow function with multiple parameters
const multiply = (x, y) => {
    return x * y;
};
console.log("Multiplication of 6 and 7:", multiply(6, 7));

// Calling functions
showMarks(marks);
console.log("Highest Mark:", findHighest(marks));
console.log("Lowest Mark:", findLowest(marks));
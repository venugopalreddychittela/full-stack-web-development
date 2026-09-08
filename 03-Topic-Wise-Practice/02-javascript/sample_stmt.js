let temperature = 25;

if (temperature > 20) {
  console.log("It's a warm day!"); // This will execute
}

//else
let isRaining = false;

if (isRaining) {
  console.log("Don't forget your umbrella.");
} else {
  console.log("Enjoy the clear skies!"); // This will execute
}

//else if
let score = 75;

if (score >= 90) {
  console.log("Excellent! Grade A.");
} else if (score >= 80) {
  console.log("Very good! Grade B.");
} else if (score >= 70) {
  console.log("Good job! Grade C."); // This will execute
} else {
  console.log("Keep trying! Grade F.");
}

//switch cases
let dayOfWeek = "Wednesday";

switch (dayOfWeek) {
  case "Monday":
    console.log("It's the start of the week.");
    break; // Important: 'break' exits the switch statement
  case "Wednesday":
    console.log("Hump day!"); // This will execute
    break;
  case "Friday":
    console.log("Almost the weekend!");
    break;
  default: // Executed if none of the cases match
    console.log("Just a regular day.");
}

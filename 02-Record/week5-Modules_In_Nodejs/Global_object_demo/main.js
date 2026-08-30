//1.global example

global.loginCount = 0;

function userLoggedIn() {
    global.loginCount++;
    console.log(`Total logins: ${global.loginCount}`);
}

userLoggedIn(); 
userLoggedIn(); 
userLoggedIn(); 

// ex:2 share data 
require("./config.js");
console.log(`Welcome to ${APP_NAME} v${APP_VERSION}`);


// 2.console Example
const user = { 
    Name: "Venu", 
    age:"" 
};

console.log("User object:", user);
console.table(user);
console.error("User age is missing!"); 

// ex:2
console.time("loopTime");

for (let i = 0; i < 100; i++) {} 

console.timeEnd("loopTime");

//3.process example:
console.log(process.pid); 
console.log("Current folder:", process.cwd());

//4.buffer example:
console.log("=======Buffer example below=======");
const buf1 = Buffer.from("Node");
const buf2 = Buffer.from(" JS");
const combined = Buffer.concat([buf1, buf2]);
console.log("combined buffer of buf1,buf2:",combined.toString());
// buffer example2
const buf = Buffer.from("Hello");
console.log(buf);           
//buffer example3
const buf3 = Buffer.alloc(5); 
console.log("Buffer3:" ,buf3);
const buf4 = Buffer.alloc(5, "A"); 
console.log("Buffer4:",buf4.toString()); 

//5.__dirname example:
const path = require("path");

const filePath = path.join(__dirname,"text");
console.log("Full file path:", filePath);

//6.__filename example:
console.log(`This file's folder: ${__filename}`);

//7.setTimeout
console.log("==========Set Timeout examples below========");
console.log("Waiting...");

setTimeout(() => {
    console.log("2 seconds passed!");
}, 2000);

// setTimeoutExample2.js
console.log("Order placed!");

setTimeout(() => {
    console.log("Your order has been shipped 📦");
}, 3000);

console.log("You can continue browsing...");

//8.setInterval example
let count = 0;
console.log("=======Set interval example below==========");
const timer = setInterval(() => {
    
    console.log(`Tick ${count}`);
    count++;

    if (count === 3) {
        clearInterval(timer); // stop after 3 ticks
        console.log("Stopped!");
    }
}, 5000);
const fs = require('fs');

console.log("----- FILE HANDLING DEMONSTRATION -----");

// 1. READ FILE ASYNCHRONOUSLY
fs.readFile('readAsync.txt', 'utf8', (err, data) => {
    if (err) throw err;

    console.log("\n1. ASYNCHRONOUS READ:");
    console.log(data);
});


// 2. READ FILE SYNCHRONOUSLY
try {
    const data = fs.readFileSync('readSync.txt', 'utf8');

    console.log("\n2. SYNCHRONOUS READ:");
    console.log(data);

} catch (err) {
    console.error(err);
}

// 3. WRITE FILE ASYNCHRONOUSLY
fs.writeFile(
    'writeAsync.txt',
    'This file is created using asynchronous writeFile method.',
    (err) => {
        if (err) throw err;

        console.log("\n3. ASYNCHRONOUS WRITE: File created successfully!");
    }
);

// 4. WRITE FILE SYNCHRONOUSLY
try {
    fs.writeFileSync(
        'writeSync.txt',
        'This file is created using synchronous writeFileSync method.'
    );

    console.log("\n4. SYNCHRONOUS WRITE: File created successfully!");

} catch (err) {
    console.error(err);
}

// 5. APPEND CONTENT
fs.appendFile(
    'appendFile.txt',
    '\nThis content is added using appendFile method.',
    (err) => {
        if (err) throw err;

        console.log("\n5. APPEND: Content added successfully!");
    }
);

// 6. DELETE FILE
fs.unlink('deleteMe.txt', (err) => {
    if (err) throw err;

    console.log("\n6. DELETE: File deleted successfully!");
});
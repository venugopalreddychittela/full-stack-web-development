/*const http = require("http");


http.createServer((req, res) => {
    if (req.url === "/home") {
        res.end("Home Page");
    }
}).listen(3000);*/








const express = require('express');
const app = express();


// Sample product data
const products = [
    { id: 1, name: 'Lapto', price: 4500 },
    { id: 2, name: 'Smartphon', price: 2500 },
    { id: 3, name: 'Headphone', price: 150 }
];


// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Product Catalog API');
});


// Get all products
app.get('/products', (req, res) => {
    // res.json(products);
    res.send(products);
});


// Get product by ID // Start the server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

app.get('/products/:name', (req, res) => {
    const productId = req.params.name;
    const product = products.find(p => p.name === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send({ error: 'Product not found' });
    }

})
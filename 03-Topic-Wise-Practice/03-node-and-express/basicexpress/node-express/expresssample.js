const express = require('express');
const app = express();
const port = 4000;


app.get('/users/:id', (req, res) => {
    res.send(`User ID is ${req.params.id}`);
});


app.listen(4000, () => {
    console.log('Server is running on port 3000');
    console.log(`Visit http://localhost:${port} to view the app`);
});

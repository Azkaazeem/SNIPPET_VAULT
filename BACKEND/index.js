const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Backend is running Successfully!');
});

app.listen(port , () => {
    console.log(`Backend is running on port ${port}`);
});
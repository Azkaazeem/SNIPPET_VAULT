const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const Snippet = require('./models/snippet.js');

dotenv.config();
app.use(cors());

app.use(express.json()); 

mongoose.connect("mongodb://localhost:27017/snippetDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Backend is running Successfully!');
});

// CREATE ROUTE
app.post('/api/snippets', (req, res) => {
    // Note: Frontend se 'code' aa raha tha, isliye 'content' ki jagah 'code' ko receive karein 
    // ya phir frontend mein key ka naam 'content' kar dein. Main yahan 'code' use kar raha hon 
    // jaisa aapke purane App.jsx mein tha.
    let { title, category, code } = req.body; 
    
    const newSnippet = new Snippet({
        title: title,
        category: category,
        content: code // Yahan frontend wale 'code' ko database ke 'content' field mein daal rahe hain
    });

    newSnippet.save()
        .then((savedDoc) => res.status(201).json(savedDoc))
        .catch(err => res.status(400).json('Error: ' + err));
});

// READ ROUTE
app.get('/api/snippets', async (req, res) => {
    try {
        const snippets = await Snippet.find().sort({ _id: -1 });
        res.json(snippets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching snippets', error });
    }
});

// DELETE ROUTE
app.delete('/api/snippets/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Snippet.findByIdAndDelete(id); 
        
        res.json({ message: 'Snippet deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Delete failed' });
    }
});

// UPDATE ROUTE
app.put('/api/snippets/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, category, code } = req.body;

        const updatedSnippet = await Snippet.findByIdAndUpdate(
            id,
            { title: title, category: category, content: code },
            { new: true } 
        );
        
        res.json(updatedSnippet);
    } catch (error) {
        res.status(500).json({ error: 'Update failed' });
    }
});

app.listen(port , () => {
    console.log(`Backend is running on port ${port}`);
});
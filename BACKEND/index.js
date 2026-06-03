const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// 1. Snippet model ko import karein (Yeh line add karein)
const Snippet = require('./models/snippet.js');

dotenv.config();
app.use(cors());

// 2. JSON data read karne ke liye middleware add karein (Yeh line add karein)
app.use(express.json()); 

mongoose.connect("mongodb://localhost:27017/snippetDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Backend is running Successfully!');
});

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

// Saare Snippets Database se Get karne ka Route
app.get('/api/snippets', async (req, res) => {
    try {
        // Snippet.find() se saare snippets milenge, aur .sort() se naye snippets sab se upar aayenge
        const snippets = await Snippet.find().sort({ _id: -1 });
        res.json(snippets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching snippets', error });
    }
});

// Snippet Delete karne ka Route
app.delete('/api/snippets/:id', async (req, res) => {
    try {
        const id = req.params.id; // URL se id nikal li
        await Snippet.findByIdAndDelete(id); // Database se delete kar diya
        
        res.json({ message: 'Snippet deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Delete failed' });
    }
});

// Snippet Update (Edit) karne ka Route
app.put('/api/snippets/:id', async (req, res) => {
    try {
        const id = req.params.id; // URL se id nikal li
        const { title, category, code } = req.body; // Frontend se naya data aaya

        // findByIdAndUpdate: pehla parameter ID, doosra naya data, teesra {new: true} taake update hone ke baad naya data return ho
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
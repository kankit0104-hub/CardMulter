const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Serve the uploads folder publicly
app.use('/uploads', express.static('uploads'));

// 1. Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 2. The Upload Route
// 'image' is the name of the field coming from the frontend
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // In a real app, you'd save these details to MongoDB here
    const fileData = {
        description: req.body.description,
        imageUrl: `http://localhost:5000/uploads/${req.file.filename}`
    };

    res.status(200).json(fileData);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
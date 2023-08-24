// app.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const articles = require('./routes/api/articles');

const app = express();


// Connect Database
connectDB();

// // cors
// app.use(cors({ ori gin: true, credentials: true }));

// Allow requests from your frontend's domain
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/articles', articles);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

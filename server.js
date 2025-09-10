const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db.config');

dotenv.config();

connectDb();

const app = express();

// const{PORT} = process.env
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
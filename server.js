const express = require('express');
const dotenv = require('dotenv')

dotenv.config();

const app = express();

// const{PORT} = process.env
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
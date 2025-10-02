const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db.config');
dotenv.config();

connectDb();

const app = express();
app.use(express.json());



const{PORT} = process.env;

app.use("/api", require("./routes"));





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const PORT = 3000;



mongoose.connect('mongodb://localhost:27017/fitcheckDB');
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
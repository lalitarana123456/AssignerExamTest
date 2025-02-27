const dotenv = require('dotenv');
const express = require('express'); 


const connectDB = require('./config/db');



dotenv.config();
connectDB();
const app = express();
app.use(express.json());




module.exports = app;
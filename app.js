const dotenv = require('dotenv');
const express = require('express'); 
const authRoutes = require('./routes/authRoutes');


const connectDB = require('./config/db');



dotenv.config();
connectDB();
const app = express();
app.use(express.json());

//----------------------use part ---------
app.use('/api/v1/auth', authRoutes);




module.exports = app;
const dotenv = require('dotenv');
const express = require('express'); 
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');


const connectDB = require('./config/db');
const limiter = require('./middleware/rateLimitterMiddleware');



dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(limiter); // applying rate limiting globally
//----------------------use part ---------
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/upload/file', uploadRoutes);





module.exports = app;
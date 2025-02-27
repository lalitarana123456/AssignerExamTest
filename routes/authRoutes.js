const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);

router.post('/create', authController.createUser);

router.post('/user/profile ', authController.getUserProfile);

//dashboard not able to get, why it is required...and where userr will land



module.exports = router;

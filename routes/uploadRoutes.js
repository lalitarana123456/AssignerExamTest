const express = require('express');
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post("/upload", upload.single("file"), uploadController.uploadCSV);

module.exports = router;
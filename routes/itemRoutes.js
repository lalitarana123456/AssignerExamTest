const express = require('express');
const itemController = require('../controllers/itemController');


const router = express.Router();

router.get("/getItem", itemController.getItems);

module.exports = router;
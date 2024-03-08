const express = require('express');
const customer_router = express.Router();
const customer_controller = require('../controllers/customer');
const path = require("path");

customer_router.post("/getBookDetail", customer_controller.getBookDetail);
module.exports = customer_router;
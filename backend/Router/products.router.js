const express = require('express');
const getProducts = require('../Controller/Product.COntroller');
const app = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
app.get('/', authMiddleware, getProducts);
module.exports = app;

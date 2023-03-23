const express = require('express');
const { getProducts, getSingle } = require('../Controller/Product.COntroller');
const app = express.Router();
const { authMiddleware } = require('../Middleware/authMiddleware');
app.get('/', authMiddleware, getProducts);
app.get('/:id', authMiddleware, getSingle);
module.exports = app;

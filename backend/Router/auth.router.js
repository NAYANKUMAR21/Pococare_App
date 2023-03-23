const express = require('express');
const app = express.Router();
const { login, signup, refreshToken } = require('../Controller/authCOntroller');
app.post('/refreshToken', refreshToken);
app.post('/login', login);
app.post('/signup', signup);
module.exports = app;

const express = require('express');
const register = require('./controllers/register');
const userRoutes = express.Router();


userRoutes.post('/register', register);


module.exports = userRoutes;
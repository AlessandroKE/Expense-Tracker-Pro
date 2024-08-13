const express = require('express');
const register = require('./controllers/register');
const login = require('./controllers/login');
const userDashboard = require('./controllers/userDashboard');
const auth = require('../../middleware/auth');
const forgotPassword = require('./controllers/forgotPassword');
const userRoutes = express.Router();


userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.post('/forgotpw', forgotPassword);



//Protected routes
userRoutes.use(auth)

userRoutes.get('/dashboard', userDashboard);



module.exports = userRoutes;
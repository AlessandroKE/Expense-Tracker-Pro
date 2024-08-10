const express = require('express');
const auth = require('../../middleware/auth');
const addIncome = require('./controllers/addIncome');
const addExpense = require('./controllers/addIncome');
const transactionRoutes = express.Router();






//Protected routes
transactionRoutes.use(auth)

transactionRoutes.post('/add', addIncome)
transactionRoutes.post('/sub', addExpense)


module.exports = transactionRoutes;
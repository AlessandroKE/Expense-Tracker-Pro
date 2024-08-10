const express = require('express');
const auth = require('../../middleware/auth');
const addIncome = require('./controllers/addIncome');
const addExpense = require('./controllers/addIncome');
const getTransactions = require('./controllers/getTransactions');
const transactionRoutes = express.Router();






//Protected routes
transactionRoutes.use(auth)

transactionRoutes.post('/income', addIncome)
transactionRoutes.post('/expense', addExpense)
transactionRoutes.get('/transactions', getTransactions)  


module.exports = transactionRoutes;
const mongoose = require('mongoose');

const addIncome = async (req, res) => {
    const transactionModel = mongoose.model('transactions');
    const userModel = mongoose.model('users');

    // Extract the user ID from the authentication context
    const user_id = req.user._id; // Assuming req.user is populated by authentication middleware

    // Destructure the required fields from req.body
    const { amount, transaction_type, remarks } = req.body;

    // Validate the incoming data
    if (!amount || !transaction_type || !remarks) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    if (!['income', 'expense'].includes(transaction_type)) {
        return res.status(400).json({ message: 'Transaction type must be either "income" or "expense"' });
    }

    try {
        // Fetch the user to validate existence
        const user = await userModel.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new transaction with the user_id assigned
        const newTransaction = new transactionModel({
            user_id, // Use the user_id extracted from the authentication context
            amount,
            transaction_type,
            remarks
        });

        // Save the transaction
        await newTransaction.save();

        // Send a success response
        res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = addIncome;

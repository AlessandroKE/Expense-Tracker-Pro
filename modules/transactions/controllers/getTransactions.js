const mongoose = require('mongoose');



const getTransactions  = async (req, res) =>{

    const transactionModel = mongoose.model('transactions');

    const user_id = req.user._id;

    const transaction = await transactionModel.find({
        //Query strings and spread operators
        user_id,
        ...req.query

    })
    res.status(200).json({
        status: "success",
        Data: transaction
    })
}

module.exports = getTransactions;
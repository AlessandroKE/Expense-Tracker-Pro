const mongoose = require('mongoose');


const userDashboard = async (req, res) => {
    const userModel = mongoose.model('users');
    const transactionsModel = mongoose.model('transactions');

    //console.log(req.user);

    const getUser = await userModel.findOne({
        _id: req.user._id,
    }).select('full_name balance email')

    const getTransactions = await transactionsModel.find({
        user_id: req.user._id,
        //the sort with negative - descending order.
    }).sort('-createdAt').limit(3)
    res.status(200).json({
        status: "Success",
        data: getUser,
        getTransactions
    
    })
}


module.exports = userDashboard;
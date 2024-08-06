const mongoose = require('mongoose');


const userDashboard = async (req, res) => {
    const userModel = mongoose.model('users');

    //console.log(req.user);

    const getUser = await userModel.findOne({
        _id: req.user._id,
    }).select('full_name balance email')


    res.status(200).json({
        status: "Sucess",
        data: getUser
    })
}


module.exports = userDashboard;
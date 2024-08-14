const mongoose = require('mongoose');
const resetPasword = (req, res) => {

    const userModel = mongoose.model('users');

    res.status(200).json({
        status: `success`,
        message: `Hello from Reset Password!`
    }) 

}


module.exports=resetPasword
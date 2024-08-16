const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const resetPassword = async (req, res) => {
    try {
        const userModel = mongoose.model('users');
        const { email, resetCode, newPassword } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!resetCode) {
            return res.status(400).json({ message: "Reset code is required" });
        }
        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }

        const getUserWithResetCode = await userModel.findOne({
            email: email,
            resetCode: resetCode
        });

        if (!getUserWithResetCode) {
            return res.status(400).json({ message: 'Reset Code does not match' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await userModel.updateOne(
            { email: email },
            {
                password: hashedPassword,
                resetCode: ""
            },
            { runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while resetting the password'
        });
    }
};

module.exports = resetPassword;
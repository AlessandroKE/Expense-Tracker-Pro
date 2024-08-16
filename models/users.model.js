const mongoose = require('mongoose');


//update users model to pick first name and last name.
const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensures email uniqueness
        lowercase: true, // Converts email to lowercase
        trim: true, // Removes any leading/trailing whitespace
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Email format validation
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    balance: {
        type: Number,
        required: [true, 'Balance is required'],
        default: 0
    },
    resetCode: {
        type: Number,
    },
    resetCodeExpiry: {
        type: Date
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    full_name:{
        type: 'string',
        required: [true, 'full name is required']
    },
    email:{
        type: 'string',
        required: [true, 'email is required']
    },
    password:{
        type: 'string',
        required: [true, 'password is required']
    },
    Balance:{
        type: 'number',
        required: [true, 'balance is required'],
        default: 0,
    }
})


const userModel = mongoose.model('users', userSchema);


module.exports = userModel;

const mongoose = require('mongoose')
const jsonwebtoken = require('jsonwebtoken');

const jwtManager = (users) =>{

    const acessToken =  
    jsonwebtoken.sign({
        _id: users._id, full_name:users.full_name, email:users.email},
         process.env.jwt_salt)

    return acessToken;

}

module.exports = jwtManager
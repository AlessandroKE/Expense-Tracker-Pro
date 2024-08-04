const jsonwebtoken = require('jsonwebtoken');


const auth = (req, res, next) => {


   // console.log(req.headers);

   /*  console.log ("Hello from Middleware")
    throw "cant do this now";
   // next(); */

   const acessToken = req.headers.authorization.replace("Bearer ","");


   const JWTverification = jsonwebtoken.verify(
    acessToken, 
    process.env.jwt_salt
    );
   console.log(JWTverification);

   next();
}

module.exports = auth;
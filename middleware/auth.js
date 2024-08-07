const jsonwebtoken = require('jsonwebtoken');


const auth = (req, res, next) => {


    // console.log(req.headers);

    /*  console.log ("Hello from Middleware")
     throw "cant do this now";
    // next(); */
    try {
        const accessToken = req.headers.authorization.replace("Bearer ", "");


        const JWTverification = jsonwebtoken.verify(
            accessToken,
            process.env.jwt_salt
        );
        console.log(JWTverification);
        req.user = JWTverification;

    } catch (err) {
        res.status(401).json({ 
            status: "failed",
            Error: err.message
        });
        return;
    }
    next();

}

module.exports = auth;
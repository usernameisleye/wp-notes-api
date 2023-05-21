const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userAuthMiddleware = async (req, res, next) => {
    let jwtToken;

    jwtToken = req.cookies.jwt;

    if(jwtToken){
        try{
            const decodedToken = jwt.verify(jwtToken, process.env.SECRET);
    
            req.user = await User.findById(decodedToken._id).select("_id");
    
            next();
        }
        catch(error){
            res.status(401)
            .json({
                error: "Unauthorized request, Invalid token"
            });
        }

    }else{
        res.status(401)
        .json({
            error: "Unauthorized request, No token found"
        });
    }
};

module.exports = userAuthMiddleware;
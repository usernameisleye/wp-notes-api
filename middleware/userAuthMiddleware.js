const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userAuthMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        res.status(400).json({ error: "Missing authorization header" });
    }

    const token = authorization.split(" ")[1] //Splitting auth header to get JWT

    try{
        const { _id } = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({ _id }).select("id"); //Getting id and storing in req user obj
        next();
    }
    catch(error){
        res.status(400).json({ error: "Unauthorized request" });
    }
};

module.exports = userAuthMiddleware;
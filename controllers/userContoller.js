const User = require("../models/userModel");

const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createJWT = ( _id ) => { //Create JWT
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "5d" });
}

// Create avatar
const user_avatar = async (req, res) => {
    const { username, background, baseColor ,eyes, eyeBrows ,nose, ears, mouth, hair, hairColor, shirt, shirtColor } = req.body;

    // Avatar queries for design specifics
    const queries = `seed=${username}&backgroundColor=${background}&baseColor=${baseColor}&eyes=${eyes}&eyebrows=${eyeBrows}&nose=${nose}&ears=${ears}&mouth=${mouth}&hair=${hair}&hairColor=${hairColor}&shirt=${shirt}&shirtColor=${shirtColor}&glassesProbability=0&earringsProbability=0`;

    try{
        const avatar = `https://api.dicebear.com/6.x/micah/svg?${queries}`;
    
        res.status(200).json(avatar);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

// Sign up user
const user_signup = async (req, res) => {
    const { avatar, username, email, password } = req.body;

    try{
        if(!username || !email || !password){
            throw Error("Fill in all fields");
        }
        if(!validator.isEmail(email)){
            throw Error("Invalid email address");
        }
        if(!validator.isStrongPassword(password)){
            throw Error("Password is not strong enough");
        }

        const isFound = await User.findOne({ email });
        if(isFound){
            throw Error("Email already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ avatar, username, email, password: hash });
        const token = createJWT(user._id);

        res.status(200).json({ username, token });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

// Login user
const user_login = async (req, res) => {
    const { email, password } = req.body;

    try{
        if(!email || !password){
            throw Error("All fields are required");
        }
        
        const user = await User.findOne({ email });
        if(!user){
            throw Error("Wrong email address");
        }

        const compare = await bcrypt.compare(password, user.password);
        if(!compare){
            throw Error("Wrong password, try again");
        };

        const token = createJWT(user._id);
        res.status(200).json({ username: user.username , token });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    user_avatar,
    user_signup,
    user_login
};
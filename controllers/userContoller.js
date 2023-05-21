const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createJWT = ( res, _id ) => { //Create JWT
    const token = jwt.sign({ _id }, process.env.SECRET, { 
        expiresIn: "7d" 
    });

    // + 7 days
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    res.cookie('jwt', token, { 
        httpOnly: true,
        sameSite: "Strict",
        path: "/",
        expires: expirationDate
    });
}

// Create avatar
const user_avatar = async (req, res) => {
    const { 
        username, 
        background, 
        baseColor, 
        eyes, 
        eyeBrows, 
        nose, 
        ears, 
        mouth, 
        hair, 
        hairColor, 
        shirt, 
        shirtColor 
    } = req.body;

    // Avatar queries for design specifics
    const queries = `seed=${username}&backgroundColor=${background}&baseColor=${baseColor}&eyes=${eyes}&eyebrows=${eyeBrows}&nose=${nose}&ears=${ears}&mouth=${mouth}&hair=${hair}&hairColor=${hairColor}&shirt=${shirt}&shirtColor=${shirtColor}&glassesProbability=0&earringsProbability=0`;

    try{
        const avatar = `https://api.dicebear.com/6.x/micah/svg?${queries}`;
    
        res.status(200).json(avatar);
    }
    catch(error){
        res.status(400).json({ 
            error: error.message 
        });
    }
};

// Sign up user
const user_signup = async (req, res) => {
    const { 
        avatar, 
        username, 
        email, 
        password
    } = req.body;

    try{
        if(!username || !email || !password){
            throw Error("Fill in all fields");
        };

        const isFound = await User.findOne({ email });
        if(isFound){
            throw Error("User already exists");
        }

        const user = await User.create({ 
            avatar, 
            username, 
            email, 
            password
        });

        createJWT(res, user._id); 
        
        if(user){
            res.status(201)
            .json({ 
                avatar, 
                username 
            });
        }else{
            res.status(400)
            .json({
                error: "Invalid details"
            })
        }
    }
    catch(error){
        res.status(400)
        .json({
            error: error.message 
        });
    }
};

// Login user
const user_login = async (req, res) => {
    const { 
        email, 
        password 
    } = req.body;

    try{  
        if(!email || !password){
            throw Error("Fill in all fields");
        };

        const user = await User.findOne({ email });

        if(user && (await user.compare(password))){
            createJWT(res, user._id);
        
            const { avatar, username } = user;
            res.status(200)
            .json({ 
                avatar,
                username
            });
        }else{
            res.status(401)
            .json({
                error: "Invalid email or password"
            });
        }
    }
    catch(error){
        res.status(401)
        .json({ 
            error: error.message 
        });
    }
};

// Logout
const user_logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ 
        msg: "User logged out" 
    });
}

module.exports = {
    user_avatar,
    user_signup,
    user_login,
    user_logout
};
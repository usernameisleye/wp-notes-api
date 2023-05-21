const Comment = require("../models/commentModel");
const nodemailer = require("nodemailer");

// Fetch blogs from blog API
const fetch_blogs = async (req, res) => {
    try{
        const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles/");
        const json = await response.json();

        res.status(200)
        .json(json);
    }
    catch(error){
        res.status(400)
        .json({ 
            error: error.message 
        });
    }
};

// Get a blog
const fetch_blog = async (req, res) => {
    const { id } = req.params;

    try{
        const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);
        const json = await response.json();

        res.status(200)
        .json(json);
    }
    catch(error){
        res.status(400)
        .json({ 
            error: error.message 
        });
    }
};

// Get all comments
const get_comments = async (req, res) => {
    try{
        const comments = await Comment.find({})
        .sort({ createdAt: -1 });

        res.status(200)
        .json(comments);
    }
    catch(error){
        res.status(400)
        .json({ 
            error: error.message 
        });
    }
};

// Create a comment
const create_comment = async (req, res) => {
    try{
        const comment = await Comment.create({ ...req.body });
        res.status(200)
        .json(comment);
    }
    catch(error){
        res.status(400)
        .json({ 
            error: error.message 
        });
    }
};

// Delete a comment
const delete_comment = async (req, res) => {
    const { id } = req.params;

    try{
        const comment = await Comment.findOneAndDelete({ _id: id})
        res.status(200)
        .json(comment);
    }
    catch(error){
        res.status(400)
        .json({ 
            error: error.message 
        });
    }
};

// Send mail
const send_mail = async (req, res) => {
    const { email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MY_MAIL,
            pass: process.env.MY_PASSWORD
        }
    });

    const template = {
        from: `${ email }`,
        to: process.env.MY_MAIL,
        subject: "WP Notes",
        text: `${ message }` 
    };

    transporter.sendMail(template, (error, info) => {
        if(error){
            res.status(400)
            .json({ 
                error: error.message 
            });
        }
        else{
            res.status(200)
            .json({ 
                msg: "Mail sent" 
            });
        }
    })
}

module.exports = {
    fetch_blogs,
    fetch_blog,
    get_comments,
    create_comment,
    delete_comment,
    send_mail
};


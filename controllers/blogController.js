const Comment = require("../models/commentModel");

// Fetch blogs from blog API
const fetch_blogs = async (req, res) => {
    try{
        // const response = await fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + process.env.API_KEY);
        const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles/");
        const json = await response.json();
    
        res.status(200).json(json);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

// Get all comments
const get_comments = async (req, res) => {
    try{
        const comments = await Comment.find({}).sort({ createdAt: -1 });
        res.status(200).json(comments);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

// Create a comment
const create_comment = async (req, res) => {
    try{
        const comment = await Comment.create({ ...req.body});
        res.status(200).json(comment);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

// Delete a comment
const delete_comment = async (req, res) => {
    const { id } = req.params;

    try{
        const comment = await Comment.findOneAndDelete({ _id: id})
        res.status(200).json(comment);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    fetch_blogs,
    get_comments,
    create_comment,
    delete_comment
};


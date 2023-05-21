const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    avatar: {
        type: String,
        required: false
    },
    post_id: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model("Comment", commentSchema);
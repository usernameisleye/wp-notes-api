const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    pinned: {
        type: Boolean,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
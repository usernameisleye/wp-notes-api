const express = require("express");
const router = express.Router();
// Controllers
const {
    fetch_blogs,
    get_comments,
    create_comment,
    delete_comment
} = require("../controllers/blogController");

// Routes
router.get("/", fetch_blogs);

router.get("/comments", get_comments);

router.post("/comments", create_comment);

router.delete("/comment/:id", delete_comment);

module.exports = router;

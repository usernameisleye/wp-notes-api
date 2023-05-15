const express = require("express");
const router = express.Router();
// Controllers
const {
    fetch_blogs,
    get_comments,
    create_comment,
    delete_comment,
    send_mail
} = require("../controllers/blogController");
const userAuthMiddleware = require("../middleware/userAuthMiddleware") //Auth

// Routes
router.get("/", fetch_blogs);

// router.use(userAuthMiddleware);

// Protected routes
router.get("/comments", get_comments);

router.post("/comments", create_comment);

router.delete("/comments/:id", delete_comment);

router.post("/mail", send_mail);

module.exports = router;

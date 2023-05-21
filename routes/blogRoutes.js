const express = require("express");
const router = express.Router();
// Controllers
const {
    fetch_blogs,
    fetch_blog,
    get_comments,
    create_comment,
    delete_comment,
    send_mail
} = require("../controllers/blogController");
const userAuthMiddleware = require("../middleware/userAuthMiddleware") //Auth

// Routes
router
.route("/")
.get(fetch_blogs)

router.use(userAuthMiddleware);

// Protected routes
router
.route("/comments")
.get(get_comments)
.post(create_comment)

router
.route("/:id")
.get(fetch_blog);

router
.route("/comments/:id")
.delete(delete_comment);

router
.route("/mail")
.post(send_mail)


module.exports = router;

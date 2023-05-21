const express = require("express");
const router = express.Router();
// Contoller
const {
    user_avatar,
    user_signup,
    user_login,
    user_logout
} = require("../controllers/userContoller");

// Routes
router
.route("/avatar")
.post(user_avatar);

router
.route("/signup")
.post(user_signup);

router
.route("/login")
.post(user_login);

router
.route("/logout")
.post(user_logout);

module.exports = router;



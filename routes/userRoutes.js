const express = require("express");
const router = express.Router();
// Contoller
const {
    user_avatar,
    user_signup,
    user_login
} = require("../controllers/userContoller");

// Routes
router.get("/avatar", user_avatar);

router.post("/signup", user_signup);

router.post("/login", user_login);

module.exports = router;



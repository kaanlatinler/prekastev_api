const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/authController");
const authenticateToken = require("../../middlewares/authMiddleware");

router.post("/register", authenticateToken, authController.Register);
router.post("/login", authController.Login);

module.exports = router;

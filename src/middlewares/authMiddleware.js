const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied", success: false });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid token", success: false });
      }

      const userFromToken = await User.findByPk(user.id);
      if (!userFromToken) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      req.user = userFromToken;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = authenticateToken;

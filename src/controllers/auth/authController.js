const jwt = require("jsonwebtoken");

const User = require("../../models/User");

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found", succes: false });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .json({ message: "Password is incorrect", succes: false });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, succes: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.Register = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    const user = await User.create({ name, lastname, email, password });

    res.status(201).json({ user, succes: true });
  } catch (error) {
    res.status(500).json({ message: error.message, succes: false });
  }
};

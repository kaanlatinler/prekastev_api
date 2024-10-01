const User = require("../../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    const user = await User.create({ name, lastname, email, password });

    res.status(201).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.password = password;

    await user.save();

    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    await user.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const HomeAbout = require("../../models/HomeAbout");

exports.getAbouts = async (req, res) => {
  try {
    const abouts = await HomeAbout.findAll();
    res.status(200).json({ abouts, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.addAbout = async (req, res) => {
  try {
    const { message, image } = req.body;

    const about = await HomeAbout.create({ message, image });

    res.status(201).json({ about, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, image } = req.body;

    const about = await HomeAbout.findByPk(id);
    if (!about) {
      return res
        .status(404)
        .json({ message: "About not found", success: false });
    }

    about.message = message;
    about.image = image;

    await about.save();

    res.status(200).json({ about, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await HomeAbout.findByPk(id);
    if (!about) {
      return res
        .status(404)
        .json({ message: "About not found", success: false });
    }

    await about.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.getAbout = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await HomeAbout.findByPk(id);
    if (!about) {
      return res
        .status(404)
        .json({ message: "About not found", success: false });
    }

    res.status(200).json({ about, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

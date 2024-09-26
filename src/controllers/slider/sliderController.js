const HomeSlider = require("../../models/HomeSlider");

exports.getSliders = async (req, res) => {
  try {
    const sliders = await HomeSlider.findAll();
    res.status(200).json({ sliders, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.addSlider = async (req, res) => {
  try {
    const { title, image } = req.body;

    const slider = await HomeSlider.create({ title, image });

    res.status(201).json({ slider, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image } = req.body;

    const slider = await HomeSlider.findByPk(id);
    if (!slider) {
      return res
        .status(404)
        .json({ message: "Slider not found", success: false });
    }

    slider.title = title;
    slider.image = image;

    await slider.save();

    res.status(200).json({ slider, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;

    const slider = await HomeSlider.findByPk(id);
    if (!slider) {
      return res
        .status(404)
        .json({ message: "Slider not found", success: false });
    }

    await slider.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.getSlider = async (req, res) => {
  try {
    const { id } = req.params;

    const slider = await HomeSlider.findByPk(id);
    if (!slider) {
      return res
        .status(404)
        .json({ message: "Slider not found", success: false });
    }

    res.status(200).json({ slider, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

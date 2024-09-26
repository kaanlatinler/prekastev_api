const Founder = require("../../models/Founder");

exports.getFounders = async (req, res) => {
  try {
    const founders = await Founder.findAll();
    res.status(200).json({ founders, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.addFounder = async (req, res) => {
  try {
    const { name, surname, title, paragraph, description } = req.body;

    const founder = await Founder.create({
      name,
      surname,
      title,
      paragraph,
      description,
    });

    res.status(201).json({ founder, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.updateFounder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, title, paragraph, description } = req.body;

    const founder = await Founder.findByPk(id);
    if (!founder) {
      return res
        .status(404)
        .json({ message: "Founder not found", success: false });
    }

    founder.name = name;
    founder.surname = surname;
    founder.title = title;
    founder.paragraph = paragraph;
    founder.description = description;

    await founder.save();

    res.status(200).json({ founder, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.deleteFounder = async (req, res) => {
  try {
    const { id } = req.params;

    const founder = await Founder.findByPk(id);
    if (!founder) {
      return res
        .status(404)
        .json({ message: "Founder not found", success: false });
    }

    await founder.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

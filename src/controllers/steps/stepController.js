const HomeSteps = require("../../models/HomeSteps");

exports.getSteps = async (req, res) => {
  try {
    const steps = await HomeSteps.findAll();
    res.status(200).json({ steps, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.addStep = async (req, res) => {
  try {
    const { title, message } = req.body;

    const step = await HomeSteps.create({ title, message });

    res.status(201).json({ step, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.updateStep = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message } = req.body;

    const step = await HomeSteps.findByPk(id);
    if (!step) {
      return res
        .status(404)
        .json({ message: "Step not found", success: false });
    }

    step.title = title;
    step.message = message;

    await step.save();

    res.status(200).json({ step, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.deleteStep = async (req, res) => {
  try {
    const { id } = req.params;

    const step = await HomeSteps.findByPk(id);
    if (!step) {
      return res
        .status(404)
        .json({ message: "Step not found", success: false });
    }

    await step.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.getStep = async (req, res) => {
  try {
    const { id } = req.params;

    const step = await HomeSteps.findByPk(id);
    if (!step) {
      return res
        .status(404)
        .json({ message: "Step not found", success: false });
    }

    res.status(200).json({ step, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const Services = require("../../models/Services");

exports.getServices = async (req, res) => {
  try {
    const services = await Services.findAll();

    res.status(200).json({ services, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.addServices = async (req, res) => {
  try {
    const { title, description } = req.body;

    const service = await Services.create({
      title,
      description,
    });

    res.status(201).json({ service, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.updateServices = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const service = await Services.findByPk(id);

    if (!service) {
      return res
        .status(404)
        .json({ message: "Service not found", success: false });
    }

    service.title = title;
    service.description = description;

    await service.save();

    res.status(200).json({ service, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.deleteServices = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Services.findByPk(id);

    if (!service) {
      return res
        .status(404)
        .json({ message: "Service not found", success: false });
    }

    await service.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.getService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Services.findByPk(id);

    if (!service) {
      return res
        .status(404)
        .json({ message: "Service not found", success: false });
    }

    res.status(200).json({ service, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

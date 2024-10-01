const Portfoilo = require("../../models/Portfoilo");
const Images = require("../../models/Images");

exports.getPortfoilos = async (req, res) => {
  try {
    const portfoilos = await Portfoilo.findAll({
      include: [
        {
          model: Images,
          attributes: ["url"],
        },
      ],
      order: [["title", "ASC"]], // Burada alfabetik sıralama yapıyoruz
    });
    res.status(200).json({ portfoilos, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.addPortfoilo = async (req, res) => {
  try {
    const {
      title,
      area,
      groundFloorGrossArea,
      groundFloorTerrace,
      groundFloorPool,
      firstFloorGrossArea,
      firstFloorTerrace,
      roomCount,
      filter,
      mainPicture,
      images,
    } = req.body;

    // Portfoilo oluştur
    const portfoilo = await Portfoilo.create({
      title,
      area,
      groundFloorGrossArea,
      groundFloorTerrace,
      groundFloorPool,
      firstFloorGrossArea,
      firstFloorTerrace,
      roomCount,
      filter,
      mainPicture, // Resim URL'leri ile kaydetme
    });

    if (images && images.length > 0) {
      const imagePromises = images.map(async (image) => {
        return await Images.create({
          url: image,
          pId: portfoilo.id,
        });
      });

      await Promise.all(imagePromises);
    }

    res.status(201).json({ portfoilo, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.updatePortfoilo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      area,
      groundFloorGrossArea,
      groundFloorTerrace,
      groundFloorPool,
      firstFloorGrossArea,
      firstFloorTerrace,
      roomCount,
      filter,
      mainPicture,
      images, // images array
    } = req.body;

    // Portfoilo'yu bul
    const portfoilo = await Portfoilo.findByPk(id);
    if (!portfoilo) {
      return res
        .status(404)
        .json({ message: "Portfoilo not found", success: false });
    }

    // Portfoilo'yu güncelle
    portfoilo.title = title;
    portfoilo.area = area;
    portfoilo.groundFloorGrossArea = groundFloorGrossArea;
    portfoilo.groundFloorTerrace = groundFloorTerrace;
    portfoilo.groundFloorPool = groundFloorPool;
    portfoilo.firstFloorGrossArea = firstFloorGrossArea;
    portfoilo.firstFloorTerrace = firstFloorTerrace;
    portfoilo.roomCount = roomCount;
    portfoilo.filter = filter;
    portfoilo.mainPicture = mainPicture;

    await portfoilo.save();

    // Portfoilo'ya ait tüm image'ları sil
    await Images.destroy({ where: { pId: portfoilo.id } });

    // Yeni image'ları kaydet
    const imagePromises = images.map(async (image) => {
      return await Image.create({
        url: image.url,
        pId: portfoilo.id,
      });
    });

    await Promise.all(imagePromises);

    res.status(200).json({ portfoilo, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.deletePortfoilo = async (req, res) => {
  try {
    const { id } = req.params;

    const portfoilo = await Portfoilo.findByPk(id);

    if (!portfoilo) {
      return res
        .status(404)
        .json({ message: "Portfoilo not found", success: false });
    }

    await portfoilo.destroy();

    const images = await Images.findAll({
      where: { pId: portfoilo.id },
    });

    images.forEach(async (image) => {
      await image.destroy();
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.getPortfoilo = async (req, res) => {
  try {
    const { id } = req.params;

    const portfoilo = await Portfoilo.findByPk(id, {
      include: [
        {
          model: Images,
          attributes: ["url", "id"],
        },
      ],
    });

    if (!portfoilo) {
      return res
        .status(404)
        .json({ message: "Portfoilo not found", success: false });
    }

    res.status(200).json({ portfoilo, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Images.findByPk(id);

    if (!image) {
      return res
        .status(404)
        .json({ message: "Image not found", success: false });
    }

    await image.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

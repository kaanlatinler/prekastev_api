const Contact = require("../../models/Contact");
const nodemailer = require("nodemailer");
const config = require("../../config/config").mail;

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json({ contacts, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.sendMail = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      message,
      areaSize,
      city,
      heardFrom,
      floors,
      startDate,
    } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const mailOptions = {
      from: email,
      to: "kaanlatinlerhd@gmail.com",
      subject: `Yeni İletişim Talebi - ${name}`,
      text: `Ad: ${name}\nE-posta: ${email}\nTelefon: ${phone}\nMesaj: ${message}\nAlan Boyutu: ${areaSize} m²\nŞehir: ${city}\nNereden Duydu: ${heardFrom}\nKat Sayısı: ${floors}\nBaşlangıç Tarihi: ${startDate}`,
    };

    // Mail gönderimi
    await transporter.sendMail(mailOptions);

    // Veritabanına kayıt işlemi
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
      areaSize,
      city,
      heardFrom,
      floors,
      startDate,
    });

    // Başarılı response
    res
      .status(201)
      .json({ contact, success: true, message: "Mail başarıyla gönderildi" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.sendMailKaputas = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const mailOptions = {
      from: email,
      to: "kaanlatinlerhd@gmail.com",
      subject: `Yeni İletişim Talebi - ${name}`,
      text: `Ad: ${name}\nE-posta: ${email}\nTelefon: ${phone}\nMesaj: ${message}`,
    };

    // Mail gönderimi
    await transporter.sendMail(mailOptions);

    // Başarılı response
    res
      .status(201)
      .json({ success: true, message: "Mail başarıyla gönderildi" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

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
    const { name, email, phone, message, areaSize, budget, propertyType } =
      req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    try {
      const mailOptions = {
        from: email,
        to: "satis@prekastev.com",
        subject: `New Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\nArea Size: ${areaSize}\nBudget: ${budget}\nProperty Type: ${propertyType}`,
      };

      await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Mail not sent", success: false });
        }
      });
      const contact = await Contact.create({
        name,
        email,
        phone,
        message,
        areaSize,
        budget,
        propertyType,
      });

      res.status(201).json({ contact, success: true, message: "Mail sent" });
    } catch (error) {}
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

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
      to: "yigityuceerdijital@gmail.com",
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
      to: "yigityuceerdijital@gmail.com",
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

exports.sendMailyy = async (req, res) => {
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
      to: "yigityuceerdijital@gmail.com",
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

exports.sendMailContractor = async (req, res) => {
  try {
    // İstekten gelen veriler
    const {
      companyName,
      taxNumber,
      website,
      industry,
      serviceType,
      otherServiceType,
      officeLocation,
      contactPersonName,
      contactEmail,
      city,
      officePhone,
      mobilePhone,
      servicesProvided,
      topClientsProjects,
      reasonToWorkWithUs,
      addedValue,
      message,
    } = req.body;

    // "Diğer" hizmet türü seçildiyse, açıklamayı dahil et
    const serviceTypeText =
      serviceType === "Diğer" && otherServiceType
        ? `${serviceType} - ${otherServiceType}`
        : serviceType;

    // Nodemailer transporter ayarı
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    // E-posta içeriği
    const mailOptions = {
      from: `"${contactPersonName}" <${contactEmail}>`,
      to: "yigityuceerdijital@gmail.com",
      subject: `Yeni Taşeron Başvurusu - ${companyName}`,
      text: `
Firma Ticari Adı: ${companyName}
Firma Vergi Kimlik Numarası (VKN): ${taxNumber}
Web Sitesi: ${website}
Sektör Türü: ${industry}

Hizmet Türü: ${serviceTypeText}

Ofis Konumu: ${officeLocation}
İletişim Kişisinin Adı: ${contactPersonName}
İletişim Email Adresi: ${contactEmail}
Şehir: ${city}
Ofis Telefonu: ${officePhone}
Cep Telefonu: ${mobilePhone}

Sunmuş Olduğunuz Hizmetler: ${servicesProvided}

Son 5 yıl içinde en önemli 3 müşterinizi ve/veya en önemli 3 projenizi sıralayın: 
${topClientsProjects}

Prekastev ile birlikte çalışmak istemenizin nedenini kısaca açıklar mısınız? 
${reasonToWorkWithUs}

Firmanızın sunduğu katma değer nedir? 
${addedValue}

Mesajınız: 
${message}
      `,
    };

    // Mail gönderimi
    await transporter.sendMail(mailOptions);

    // Başarılı response
    res.status(200).json({
      success: true,
      message: "Başvurunuz başarıyla gönderildi ve kaydedildi.",
    });
  } catch (error) {
    console.error("Mail gönderimi sırasında hata:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

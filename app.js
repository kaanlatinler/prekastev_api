require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/utils/database");

const authRoutes = require("./src/routes/auth/authRoutes");
const portfoiloRoutes = require("./src/routes/portfoilo/portfoiloRoutes");
const stepRoutes = require("./src/routes/steps/stepRoutes");
const sliderRoutes = require("./src/routes/slider/sliderRoutes");
const founderRoutes = require("./src/routes/founder/founderRoutes");
const faqRoutes = require("./src/routes/faq/faqRoutes");
const aboutRoutes = require("./src/routes/about/aboutRoutes");
const servicesRoutes = require("./src/routes/service/serviceRoutes");
const contactRoutes = require("./src/routes/contact/contactRoutes");
const userRoutes = require("./src/routes/user/userRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} to ${req.path}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/portfoilos", portfoiloRoutes);
app.use("/api/steps", stepRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/founders", founderRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/abouts", aboutRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

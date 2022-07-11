const authRoutes = require("../components/auth/auth.route");
const cardRoutes = require("../components/card/card.route");
const inMoneyRoutes = require("../components/in/in.route");
const contactRoutes = require("../components/contact/contact.route");

module.exports = (app) => {
  app.use("/api/contact", contactRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/card", cardRoutes);
  app.use("/api/in", inMoneyRoutes);
};

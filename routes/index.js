const authRoutes = require("../components/auth/auth.route");
const cardRoutes = require("../components/card/card.route");
const inMoneyRoutes = require("../components/in/in.route");
const contactRoutes = require("../components/contact/contact.route");
const outMoneyRoutes = require("../components/out/out.route");
const transactionRoutes = require("../components/transaction/transaction.route");

module.exports = (app) => {
  app.use("/api/contact", contactRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/card", cardRoutes);
  app.use("/api/in", inMoneyRoutes);
  app.use("/api/out", outMoneyRoutes);
  app.use("/api/transaction", transactionRoutes);
};

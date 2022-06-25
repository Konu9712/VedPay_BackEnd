const authRoutes = require("../components/auth/auth.route");
const cardRoutes = require("../components/card/card.route");

module.exports = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/card", cardRoutes);
};

const mongoose = require("mongoose");
const authService = require("./authService");
const User = require("../../database/Sechma/userSechma");

class AuthController {
  /**
   * @description signup new user
   */
  async signUp(req, res) {
    try {
      const { email, name, password, phoneNumber } = req.body;

      const phoneNumberExist = await User.findOne({ phoneNumber: phoneNumber });
      if (phoneNumberExist) {
        return res.status(402).json({
          error: "PhoneNumber alreday existed",
        });
      }

      const emailExist = await User.findOne({ email: email });
      if (emailExist) {
        return res.status(402).json({
          error: "Email alreday existed",
        });
      }

      const user = await authService.addNewUser(req.body);
      if (user) {
        return res.status(200).json({
          message: "ok",
          data: "Signup successful",
          user: user,
        });
      } else {
        return res.status(400).json({
          error: "Bad Request",
        });
      }
    } catch (e) {
      console.log("e", e);
      return res.status(400).json({ error: e });
    }
  }

  /**
   * @description Login user
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await authService.loginUser(req.body);
      if (user) {
        return res.status(200).json({
          message: "ok",
          data: "Login successful",
          user: user,
        });
      } else {
        return res.status(400).json({
          error: "Bad Request",
        });
      }
    } catch (e) {
      console.log("e", e);
      return res.status(400).json({ error: e });
    }
  }
}

const authController = new AuthController();
module.exports = authController;

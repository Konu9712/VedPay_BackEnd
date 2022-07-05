const mongoose = require("mongoose");
const authService = require("./authService");
const User = require("../../database/Sechma/userSechma");
const { isEmail, isEmpty } = require("../../validatorFunction/validator");

class AuthController {
  /**
   * @description signup new user
   */
  async signUp(req, res) {
    try {
      const errors = {};
      const { email, name, password, phoneNumber } = req.body;

      const phoneNumberExist = await User.findOne({ phoneNumber: phoneNumber });
      if (phoneNumberExist) {
        errors.error = "Phone Nmber alreday existed";
      }

      const emailExist = await User.findOne({ email: email });
      if (emailExist) {
        errors.error = "Email alreday existed";
      }

      if (!isEmail(email)) {
        errors.error = "Email is not in correct format";
      }

      if (phoneNumber.length !== 10) {
        errors.error = "Wrong Phone number";
      }

      // Return Errors
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          status: "error",
          message: errors[Object.keys(errors)[0]],
          errors: {
            ...errors,
          },
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
      const errors = {};
      const { phoneNumber, password } = req.body;

      if (phoneNumber.length !== 10) {
        errors.error = "Phone number must be of 10 digits";
      }

      const user = await authService.loginUser(req.body);
      if (user) {
        return res.status(200).json({
          message: "ok",
          data: "Login successful",
          user: user,
        });
      } else {
        errors.error = "Wrong Credentials";
      }

      // Return Errors
      return res.status(400).json({
        status: "error",
        message: errors[Object.keys(errors)[0]],
        errors: {
          ...errors,
        },
      });
    } catch (e) {
      console.log("e", e);
      return res.status(400).json({ error: e });
    }
  }

  /**
   * @description Get Total Balance
   */
  async totalBalance(req, res) {
    try {
      const errors = {};
      const { userId } = req.params;

      const userExisted = await User.findOne({ userId: userId });
      if (isEmpty(userExisted)) {
        errors.error = "Invalid User";
      } else {
        const result = await authService.totalBalance(userExisted);
        if (result) {
          return res.status(200).json({
            message: "ok",
            data: "Total balance",
            totalBalance: result,
          });
        } else {
          errors.error = "Could not find User";
        }
      }

      // Return Errors
      return res.status(400).json({
        status: "error",
        message: errors[Object.keys(errors)[0]],
        errors: {
          ...errors,
        },
      });
    } catch (e) {
      console.log("e", e);
      return res.status(400).json({ error: e });
    }
  }
}

const authController = new AuthController();
module.exports = authController;

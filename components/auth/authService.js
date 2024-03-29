const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Key = require("dotenv").config();
const User = require("../../database/Sechma/userSechma");
const common = require("../../helper/common");
const Card = require("../../database/Sechma/cardSechma");
const GlobalTransactionSechma = require("../../database/Sechma/globalTransactionSechma");
class AuthService {
  addNewUser = async (obj) => {
    const { email, name, phoneNumber, password } = obj;

    const userId = await common.getuniqueId();
    const token = jwt.sign(
      { email, name, phoneNumber, userId },
      process.env.TOKEN_KEY || "VedPay_Secrete_Key",
      {
        expiresIn: "20d", // expires in 20 days
      }
    );
    const user = new User({
      email,
      name,
      phoneNumber,
      password,
      userId,
      token,
      totalBalance: 0,
    });

    const card = new Card({ userId });
    const transaction = GlobalTransactionSechma({ userId });

    await transaction.save();
    await card.save();
    await user.save();
    return user;
  };

  loginUser = async (obj) => {
    const { phoneNumber, password } = obj;
    const userExist = await User.findOne({ phoneNumber: phoneNumber });
    if (userExist) {
      if (userExist.password === password) {
        const tokenPayload = {
          email: userExist.email,
          name: userExist.name,
          phoneNumber: userExist.phoneNumber,
          userId: userExist.userId,
        };
        const token = jwt.sign(tokenPayload, process.env.TOKEN_KEY || "VedPay_Secrete_Key", {
          expiresIn: "20d", // expires in 20 days
        });
        const update = { token: token };
        let updatedUser = await User.findOneAndUpdate(
          { userId: userExist.userId },
          update,
          { new: true }
        );
        return updatedUser;
      }
      return false;
    }
    return false;
  };

  totalBalance = async (userExisted) => {
    if (userExisted.totalBalance > -1) {
      return userExisted.totalBalance;
    } else {
      return false;
    }
  };
}
const authService = new AuthService();
module.exports = authService;

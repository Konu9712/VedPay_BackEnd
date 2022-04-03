const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Key = require("dotenv").config();
const User = require("../../database/Sechma/userSechma");
const common = require("../../helper/common");
class AuthService {
  addNewUser = async (obj) => {
    const { email, name, phoneNumber, password } = obj;

    const userId = await common.getuniqueId();
    const token = jwt.sign({ email_id: email }, Key.parsed.TOKEN_KEY, {
      expiresIn: "20d", // expires in 20 days
    });
    const user = new User({
      email,
      name,
      phoneNumber,
      password,
      userId,
      token,
    });
    await user.save();
    return user;
  };

  loginUser = async (obj) => {
    const { email, password, userId } = obj;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      if (userExist.password === password) {
        if (userExist.userId === userId) {
          const filter = { userId: userId };
          const token = jwt.sign({ email_id: email }, Key.parsed.TOKEN_KEY, {
            expiresIn: "20d", // expires in 20 days
          });
          const update = { token: token };
          let updatedUser = await User.findOneAndUpdate(filter, update, {
            new: true,
          });
          return updatedUser;
        }
        return false;
      }
      return false;
    }
    return false;
  };
}
const authService = new AuthService();
module.exports = authService;

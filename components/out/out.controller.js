const mongoose = require("mongoose");
const Card = require("../../database/Sechma/cardSechma");
const GlobalTransactionSechma = require("../../database/Sechma/globalTransactionSechma");
const User = require("../../database/Sechma/userSechma");
const { isEmpty } = require("../../validatorFunction/validator");
const outMoneyService = require("./outService");

class OutMoneyController {
  /**
   * @description   Transfer money from one Account to another
   */
  async outMoney(req, res) {
    try {
      const errors = {};
      const { amount, receiverPhoneNumber } = req.body;
      const { userId } = req.params;

      const userUserSechma = await User.findOne({ userId: userId });
      const reciver = await User.findOne({ phoneNumber: receiverPhoneNumber });

      if (isEmpty(userUserSechma)) {
        errors.error = "Invalid User";
      } else if (isEmpty(reciver)) {
        errors.error = `${receiverPhoneNumber} is not a VedPay user`;
      } else if (userUserSechma.totalBalance < amount) {
        errors.error = `You does not have appropriate balance`;
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

      const result = await outMoneyService.outMoney(
        userId,
        receiverPhoneNumber,
        amount
      );
      if (result) {
        return res.status(200).json({
          message: "ok",
          data: "Money added successfully",
          amountTransfered: amount,
          result: result,
        });
      } else {
        return res.status(400).json({
          error: "Error in loading Money",
        });
      }
    } catch (e) {
      console.log("e", e);
      return res.status(400).json({ error: e });
    }
  }
}

const outMoneyController = new OutMoneyController();
module.exports = outMoneyController;

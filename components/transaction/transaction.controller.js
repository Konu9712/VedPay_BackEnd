const mongoose = require("mongoose");
const Card = require("../../database/Sechma/cardSechma");
const GlobalTransactionSechma = require("../../database/Sechma/globalTransactionSechma");
const User = require("../../database/Sechma/userSechma");
const { isEmpty } = require("../../validatorFunction/validator");
const transactionService = require("./transactionService");

class TransactionController {
  /**
   * @description   Get transaction list between user and its contact
   */
  async transactionContact(req, res) {
    try {
      const errors = {};
      const { userId, contactNumber } = req.params;

      const userUserSechma = await User.findOne({ userId: userId });
      const contactSechma = await User.findOne({
        phoneNumber: contactNumber,
      });

      if (isEmpty(userUserSechma)) {
        errors.error = "Invalid User";
      } else if (isEmpty(contactSechma)) {
        errors.error = `${contactNumber} is not a VedPay user`;
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

      const result = await transactionService.transactionContact(
        userId,
        contactSechma.userId
      );
      if (true) {
        return res.status(200).json({
          message: "ok",
          data: "History",
          transactionHistory: result,
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

const transactionController = new TransactionController();
module.exports = transactionController;
const mongoose = require("mongoose");
const Card = require("../../database/Sechma/cardSechma");
const GlobalTransactionSechma = require("../../database/Sechma/globalTransactionSechma");
const User = require("../../database/Sechma/userSechma");
const { isEmpty } = require("../../validatorFunction/validator");
const imMoneyService = require("./inService");

class InMoneyController {
  /**
   * @description  Add money to wallet
   */
  async inMoney(req, res) {
    try {
      const errors = {};
      const { amount } = req.body;
      const { userId, cardId } = req.params;

      const userUserSechma = await User.findOne({ userId: userId });
      const userCardSechma = await Card.findOne({ userId: userId });
      const globalTransactionSechma = await GlobalTransactionSechma.findOne({
        userId: userId,
      });

      if (
        isEmpty(userUserSechma) ||
        isEmpty(userCardSechma) ||
        isEmpty(globalTransactionSechma)
      ) {
        errors.error = "Invalid User";
      } else {
        if (isEmpty(userCardSechma.allCards)) {
          errors.error = "No card is wallet";
        }

        const selectedCard = userCardSechma.allCards.find(
          (card) => card.cardId === cardId
        );
        if (!selectedCard) {
          errors.error = "Invalid Card";
        }
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

      const result = await imMoneyService.inMoney(userId, cardId, amount);
      if (result) {
        return res.status(200).json({
          message: "ok",
          data: "Money added successfully",
          addedAmount: amount,
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

const inMoneyController = new InMoneyController();
module.exports = inMoneyController;

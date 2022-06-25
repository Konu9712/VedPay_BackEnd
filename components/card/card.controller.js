const mongoose = require("mongoose");
const Card = require("../../database/Sechma/cardSechma");
const User = require("../../database/Sechma/userSechma");
const cardService = require("./cardService");
const { isEmpty } = require("../../validatorFunction/validator");

class CardController {
  /**
   * @description  Add card
   */
  async addCard(req, res) {
    try {
      const errors = {};
      const { cardNumber, expiry, cvv, name, type } = req.body;
      const { userId } = req.params;

      const userExisted = await User.findOne({ userId: userId });
      const user = await Card.findOne({ userId: userId });

      if (isEmpty(userExisted)) {
        errors.error = "Invalid User";
      } else if (!isEmpty(user.allCards) && user.allCards.length > 0) {
        user.allCards.forEach((card) => {
          if (card.cardNumber === cardNumber) {
            errors.cardExisted = "Card alreday existed in your wallet";
          }
        });
      }
      if (user.allCards.length >= 3) {
        errors.error = "Maximum numbers of cards are stored";
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

      const newcard = await cardService.addNewCard(req.body, req.params);
      if (newcard) {
        return res.status(200).json({
          message: "ok",
          data: "Card added successful",
          newcard: newcard,
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

const cardController = new CardController();
module.exports = cardController;

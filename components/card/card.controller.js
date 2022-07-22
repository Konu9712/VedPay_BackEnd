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
          error: "Unable to Add Card",
        });
      }
    } catch (e) {
      console.log("e", e);
      return res.status(400).json({ error: e });
    }
  }

  /**
   * @description  Get Card List
   */
  async cardlList(req, res) {
    try {
      const errors = {};
      const { userId } = req.params;

      const userUserSechma = await User.findOne({ userId: userId });
      const userCardSechma = await Card.findOne({ userId: userId });

      if (isEmpty(userUserSechma) || isEmpty(userCardSechma)) {
        errors.error = "Invalid User";
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

      const cardList = await cardService.cardlList(userCardSechma);
      if (cardList) {
        return res.status(200).json({
          message: "ok",
          data: "Card List",
          cardList: cardList,
        });
      } else {
        return res.status(400).json({
          error: "Unable to get Card List",
        });
      }
    } catch (e) {
      console.log("e", e);
      return res.status(400).json({ error: e });
    }
  }

  /**
   * @description  Delete Card From List
   */
  async deleteCard(req, res) {
    try {
      const errors = {};
      const { userId, cardId } = req.params;

      const userUserSechma = await User.findOne({ userId: userId });
      const userCardSechma = await Card.findOne({ userId: userId });

      if (isEmpty(userUserSechma) || isEmpty(userCardSechma)) {
        errors.error = "Invalid User";
      }

      if (isEmpty(userCardSechma.allCards)) {
        errors.error = "No card to delete in your Wallet";
      }

      const deleteCard = userCardSechma.allCards.find(
        (card) => card.cardId === cardId
      );
      if (!deleteCard) {
        errors.error = "Invalid Card";
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

      const result = await cardService.deleteCard(userId, cardId);
      if (result) {
        return res.status(200).json({
          message: "ok",
          data: "Card Deleted",
          deletedCard: deleteCard,
        });
      } else {
        return res.status(400).json({
          error: "Error in Deleteing Card",
        });
      }
    } catch (e) {
      console.log("e", e);
      return res.status(400).json({ error: e });
    }
  }

  /**
   * @description  Get Card Stats
   */
  async cardStats(req, res) {
    try {
      const errors = {};
      const { userId } = req.params;

      const userUserSechma = await User.findOne({ userId: userId });
      const userCardSechma = await Card.findOne({ userId: userId });

      if (isEmpty(userUserSechma) || isEmpty(userCardSechma)) {
        errors.error = "Invalid User";
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

      const stats = await cardService.cardStats(userCardSechma);
      if (stats) {
        return res.status(200).json({
          message: "ok",
          data: "Card Stats",
          cardStats: stats,
        });
      } else {
        return res.status(400).json({
          error: "Unable to get Card List",
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

const mongoose = require("mongoose");
const Card = require("../../database/Sechma/cardSechma");
const common = require("../../helper/common");

class CardService {
  addNewCard = async (obj, userId) => {
    const { cardNumber, expiry, cvv, name, type } = obj;

    const cardId = await common.getuniqueId();

    const cardDetails = {
      cardId,
      cardNumber,
      expiry,
      cvv,
      name,
      type,
    };

    const card = Card.findOneAndUpdate(
      { userId: userId.userId },
      { $push: { allCards: cardDetails } }
    ).exec(function (e, card) {
      if (e) {
        console.log("e", e);
        return false;
      } else {
        console.log(
          `Card added to ${userId.userId} user, card Number:- ${cardNumber} `
        );
      }
    });
    return cardDetails;
  };
}
const cardService = new CardService();
module.exports = cardService;

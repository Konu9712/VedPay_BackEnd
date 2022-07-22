const mongoose = require("mongoose");
const Card = require("../../database/Sechma/cardSechma");
const common = require("../../helper/common");
const { isEmpty } = require("../../validatorFunction/validator");

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

  cardlList = async (cardSechma) => {
    let { allCards } = cardSechma;
    const newList = JSON.parse(JSON.stringify(allCards));

    newList.forEach((card) => {
      delete card.cardTransctions;
    });
    return newList;
  };

  deleteCard = async (userId, cardId) => {
    const result = await Card.updateOne(
      { userId: userId },
      { $pull: { allCards: { cardId: cardId } } },
      { safe: true, multi: true, returnDocument: "after" }
    )
      .exec()
      .then(function (response) {
        if (response.modifiedCount === 1) {
          console.log(`User:- ${userId} deleted a card, card ID:- ${cardId}`);
          return true;
        } else {
          console.log(
            `Error in deleting card of user:- ${userId} card ID:- ${cardId}`
          );
          return false;
        }
      });
    return result;
  };

  cardStats = async (cardSechma) => {
    let { allCards } = cardSechma;
    const newList = JSON.parse(JSON.stringify(allCards));
    let totalTransaction = 0;
    await newList.forEach((card) => {
      totalTransaction += card.cardTransctions.length;
    });
    let data = {
      labels: [],
      data: [],
    };
    newList.forEach((card) => {
      const average = (card.cardTransctions.length / totalTransaction).toFixed(
        1
      );
      data.data.push(Number(average));
      data.labels.push(`**${String(card.cardNumber).slice(-4)}`);
    });
    return data;
  };
}
const cardService = new CardService();
module.exports = cardService;

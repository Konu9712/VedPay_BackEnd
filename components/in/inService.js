const mongoose = require("mongoose");
const Card = require("../../database/Sechma/cardSechma");
const User = require("../../database/Sechma/userSechma");
const GlobalTransactionSechma = require("../../database/Sechma/globalTransactionSechma");
const common = require("../../helper/common");

class ImMoneyService {
  inMoney = async (userId, cardId, amount) => {
    //
    // Update total Balance in userSechma
    //
    const userSechma = await User.findOneAndUpdate(
      { userId },
      { $inc: { totalBalance: amount } },
      { new: true }
    )
      .exec()
      .then(function (response) {
        if (response) {
          console.log(
            `User:- ${userId} added ${amount} from card:- ${cardId} to user wallet [userSechma]`
          );
          return response;
        } else {
          console.log(
            `Error in adding money ${amount} from card:- ${cardId} to user wallet:- ${userId} [userSechma]`
          );
          return false;
        }
      });

    //
    // PUSH transaction in cardSechma
    //
    const uniqueTransactionID = await common.getuniqueId();
    const newCardTransaction = {
      to: "Wallet",
      createdAt: new Date(),
      transactionID: uniqueTransactionID,
      amount: amount,
      status: "successful",
    };

    const cardSechma = await Card.findOneAndUpdate(
      { userId: userId, "allCards.cardId": cardId },
      { $push: { "allCards.$.cardTransctions": newCardTransaction } },
      { new: true }
    )
      .exec()
      .then(function (response) {
        if (response) {
          console.log(
            `User:- ${userId} added ${amount} from card:- ${cardId} to user wallet [cardSechma]`
          );
          return response;
        } else {
          console.log(
            `Error in adding money ${amount} from card:- ${cardId} to user wallet:- ${userId} [cardSechma]`
          );
          return false;
        }
      });

    //
    // PUSH transaction in globalTransactionSechma
    //

    const newGlobalTransaction = {
      ...newCardTransaction,
      from: cardId,
      source: "card",
    };

    const globalTransactionSechma =
      await GlobalTransactionSechma.findOneAndUpdate(
        { userId: userId },
        { $push: { transactionHistory: newGlobalTransaction } },
        { new: true }
      )
        .exec()
        .then(function (response) {
          if (response) {
            console.log(
              `User:- ${userId} added ${amount} from card:- ${cardId} to user wallet [wallettransactionSechma]`
            );
            return response;
          } else {
            console.log(
              `Error in adding money ${amount} from card:- ${cardId} to user wallet:- ${userId} [wallettransactionSechma]`
            );
            return false;
          }
        });
    if (cardSechma && userSechma && globalTransactionSechma) {
      return userSechma;
    } else {
      return false;
    }
  };
}
const imMoneyService = new ImMoneyService();
module.exports = imMoneyService;

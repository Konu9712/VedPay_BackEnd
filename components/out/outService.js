const mongoose = require("mongoose");
const User = require("../../database/Sechma/userSechma");
const GlobalTransactionSechma = require("../../database/Sechma/globalTransactionSechma");
const common = require("../../helper/common");

class OutMoneyService {
  outMoney = async (userId, reciverId, amount) => {
    //
    // Update total Balance in userSechma
    //
    const userSechma = await User.findOneAndUpdate(
      { userId },
      { $inc: { totalBalance: -amount } },
      { new: true }
    )
      .exec()
      .then(function (response) {
        if (response) {
          console.log(
            `User:- ${userId} transefered ${amount} from wallet to ${reciverId} [in User]`
          );
          return response;
        } else {
          console.log(
            `Error in transfering money ${amount} from User:- ${userId} to  ${reciverId} [in User]`
          );
          return false;
        }
      });

    //
    // Update total Balance in reciver
    //

    const reciverSechma = await User.findOneAndUpdate(
      { userId: reciverId },
      { $inc: { totalBalance: amount } },
      { new: true }
    )
      .exec()
      .then(function (response) {
        if (response) {
          console.log(
            `User:- ${userId} transefered ${amount} from wallet to ${reciverId} [in Reciver]`
          );
          return response;
        } else {
          console.log(
            `Error in transfering money ${amount} from User:- ${userId} to  ${reciverId} [in Reciver]`
          );
          return false;
        }
      });

    //
    // PUSH transaction in globalTransactionSechma in User
    //
    const uniqueTransactionID = await common.getuniqueId();

    const newGlobalTransaction = {
      to: reciverSechma.userId,
      createdAt: new Date(),
      transactionID: uniqueTransactionID,
      amount: amount,
      status: "successful",
      from: userId,
      source: "wallet",
    };
    const userglobalTransactionSechma =
      await GlobalTransactionSechma.findOneAndUpdate(
        { userId: userId },
        { $push: { transactionHistory: newGlobalTransaction } },
        { new: true }
      )
        .exec()
        .then(function (response) {
          if (response) {
            console.log(
              `User:- ${userId} transefered ${amount} from wallet to ${reciverId} [user Transaction Sechma]`
            );
            return response;
          } else {
            console.log(
              `Error in transfering money ${amount} from User:- ${userId} to  ${reciverId} [user Transaction Sechma]`
            );
            return false;
          }
        });

    //
    // PUSH transaction in globalTransactionSechma in Reciver
    //

    const reciverglobalTransactionSechma =
      await GlobalTransactionSechma.findOneAndUpdate(
        { userId: reciverId },
        { $push: { transactionHistory: newGlobalTransaction } },
        { new: true }
      )
        .exec()
        .then(function (response) {
          if (response) {
            console.log(
              `User:- ${userId} transefered ${amount} from wallet to ${reciverId} [reciver Transaction Sechma]`
            );
            return response;
          } else {
            console.log(
              `Error in transfering money ${amount} from User:- ${userId} to  ${reciverId} [reciver Transaction Sechma]`
            );
            return false;
          }
        });

    if (
      userSechma &&
      reciverSechma &&
      userglobalTransactionSechma &&
      reciverglobalTransactionSechma
    ) {
      return userglobalTransactionSechma;
    } else {
      return false;
    }
  };
}
const outMoneyService = new OutMoneyService();
module.exports = outMoneyService;

const mongoose = require("mongoose");
const moment = require("moment");
const User = require("../../database/Sechma/userSechma");
const GlobalTransactionSechma = require("../../database/Sechma/globalTransactionSechma");
const common = require("../../helper/common");

class TransactionService {
  transactionContact = async (userId, contactId) => {
    const userglobalTransactionSechma = await GlobalTransactionSechma.find({
      userId: userId,
    })
      .exec()
      .then(function (response) {
        if (response) {
          console.log(
            `User:- ${userId} checks the transaction histroy with ${contactId} [Global Transaction  Sechma]`
          );

          return response;
        } else {
          console.log(
            `Error in getting transaction history between User:- ${userId} and  ${contactId} [Global Transaction  Sechma]`
          );
          return false;
        }
      });

    let transactionArray = userglobalTransactionSechma[0].transactionHistory;
    let filteredArray = [];
    await transactionArray.forEach((transaction) => {
      if (transaction.to === contactId || transaction.from === contactId) {
        filteredArray.push(transaction);
      }
    });

    await filteredArray.reverse();

    if (userglobalTransactionSechma) {
      return filteredArray;
    } else {
      return false;
    }
  };

  transactionGlobal = async (userId) => {
    const userglobalTransactionSechma = await GlobalTransactionSechma.findOne({
      userId: userId,
    }).then(function (response) {
      if (response) {
        console.log(
          `User:- ${userId} checks the transaction global history  [Global Transaction  Sechma]`
        );

        return response;
      } else {
        console.log(
          `Error in getting transaction global history of User:- ${userId} [Global Transaction  Sechma]`
        );
        return false;
      }
    });

    let resultArray = [];
    resultArray = userglobalTransactionSechma.transactionHistory
      .reverse()
      .slice(0, 50);
    return resultArray;
  };
}

const transactionService = new TransactionService();
module.exports = transactionService;

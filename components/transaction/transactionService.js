const mongoose = require("mongoose");
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
}
const transactionService = new TransactionService();
module.exports = transactionService;

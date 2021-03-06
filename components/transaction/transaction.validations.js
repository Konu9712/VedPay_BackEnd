const { isEmpty } = require("../../validatorFunction/validator");

class TransactionValidator {
  /**
   * @description Get transaction list between user and its contact
   */
  transactionContact(req, res, next) {
    const errors = {};
    const { userId, contactNumber } = req.params;

    if (isEmpty(userId)) {
      errors.error = "User is required";
    } else if (isEmpty(contactNumber)) {
      errors.error = "Contact is required";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: "error",
        message: errors[Object.keys(errors)[0]],
        errors: {
          ...errors,
        },
      });
    } else {
      next();
    }
  }

  /**
   * @description Get latest 30 transactions list of user
   */
  transactionGlobal(req, res, next) {
    const errors = {};
    const { userId } = req.params;

    if (isEmpty(userId)) {
      errors.error = "User is required";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: "error",
        message: errors[Object.keys(errors)[0]],
        errors: {
          ...errors,
        },
      });
    } else {
      next();
    }
  }

  /**
   * @description Get latest 30 transactions list of card
   */
  cardTransaction(req, res, next) {
    const errors = {};
    const { userId, cardId } = req.params;

    if (isEmpty(userId)) {
      errors.error = "User is required";
    } else if (isEmpty(cardId)) {
      errors.error = "Card is required";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: "error",
        message: errors[Object.keys(errors)[0]],
        errors: {
          ...errors,
        },
      });
    } else {
      next();
    }
  }
}

const validationObj = new TransactionValidator();
module.exports = validationObj;

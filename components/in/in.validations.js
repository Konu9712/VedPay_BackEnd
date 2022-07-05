const { isEmpty } = require("../../validatorFunction/validator");

class InMoneyValidator {
  /**
   * @description Add Money in wallet
   */
  inMoney(req, res, next) {
    const errors = {};
    const { amount } = req.body;
    const { userId, cardId } = req.params;

    if (isEmpty(userId)) {
      errors.error = "User is required";
    } else if (isEmpty(cardId)) {
      errors.error = "CardId is required";
    } else if (isEmpty(amount) || amount <= 0) {
      errors.error = "Amount is required";
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

const validationObj = new InMoneyValidator();
module.exports = validationObj;

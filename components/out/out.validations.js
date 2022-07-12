const { isEmpty } = require("../../validatorFunction/validator");

class OutMoneyValidator {
  /**
   * @description Transfer money from one Account to another
   */
  outMoney(req, res, next) {
    const errors = {};
    const { amount, receiverPhoneNumber } = req.body;
    const { userId } = req.params;

    if (isEmpty(userId)) {
      errors.error = "User is required";
    } else if (isEmpty(receiverPhoneNumber)) {
      errors.error = "Receiver is required";
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

const validationObj = new OutMoneyValidator();
module.exports = validationObj;

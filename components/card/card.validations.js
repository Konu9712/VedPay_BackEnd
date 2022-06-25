const { isEmpty } = require("../../validatorFunction/validator");

class CardValidator {
  /**
   * @description Validate Sign in
   */
  addCard(req, res, next) {
    const errors = {};
    const { cardNumber, expiry, cvv, name, type } = req.body;
    const { userId } = req.params;

    if (isEmpty(userId)) {
      errors.error = "User is required";
    } else if (isEmpty(cardNumber)) {
      errors.error = "Card Number is required";
    } else if (String(cardNumber).length < 16) {
      errors.error = "Card number should be atleast 16 digit";
    } else if (isEmpty(expiry)) {
      errors.error = "Expiry of Card required";
    } else if (isEmpty(cvv)) {
      errors.error = "CVV is required";
    } else if (cvv.length !== 3) {
      errors.error = "CVV should be of 3 digits";
    } else if (isEmpty(name)) {
      errors.error = "Name on the Card is required";
    } else if (isEmpty(type)) {
      errors.error = "Type of Card is required";
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

const validationObj = new CardValidator();
module.exports = validationObj;

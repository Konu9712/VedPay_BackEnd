const { isEmpty } = require("../../validatorFunction/validator");

class ContactValidator {
  /**
   * @description Get all contact  and find Users
   */
  contact(req, res, next) {
    const errors = {};
    const { contactNumbers } = req.body;
    const { userId } = req.params;

    if (isEmpty(userId)) {
      errors.error = "User is required";
    } else if (!contactNumbers) {
      errors.error = "Please allow permission for contact";
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

const validationObj = new ContactValidator();
module.exports = validationObj;

const { isEmpty } = require("../../validatorFunction/validator");

class AuthenticationValidator {
  /**
   * @description Validate Sign in
   */
  signUp(req, res, next) {
    const errors = {};
    const { name, email, password, phoneNumber } = req.body;

    if (isEmpty(name)) {
      errors.error = "Name is required";
    } else if (isEmpty(email)) {
      errors.error = "Email is required";
    } else if (isEmpty(password)) {
      errors.error = "Password is required";
    } else if (isEmpty(phoneNumber)) {
      errors.error = "Phone Number is required";
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
   * @description Validate Login
   */
  login(req, res, next) {
    const errors = {};
    const { phoneNumber, password } = req.body;

    if (isEmpty(phoneNumber)) {
      errors.error = "Phone Number is required";
    } else if (isEmpty(password)) {
      errors.error = "Password is required";
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

const validationObj = new AuthenticationValidator();
module.exports = validationObj;

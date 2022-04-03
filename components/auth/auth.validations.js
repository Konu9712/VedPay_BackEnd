const { isEmpty } = require("../../validatorFunction/validator");

class AuthenticationValidator {
  /**
   * @description Validate Sign in
   */
  signUp(req, res, next) {
    const errors = {};
    const { name, email, password, phoneNumber } = req.body;

    if (isEmpty(name)) {
      errors.name = "Name is required";
    } else if (isEmpty(email)) {
      errors.email = "Email is required";
    } else if (isEmpty(password)) {
      errors.password = "Password is required";
    } else if (isEmpty(phoneNumber)) {
      errors.phoneNumber = "Phone Number is required";
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
    const { email, password, userId } = req.body;

    if (isEmpty(email)) {
      errors.email = "Email is required";
    } else if (isEmpty(password)) {
      errors.password = "Password is required";
    } else if (isEmpty(userId)) {
      errors.userId = "User Id is required";
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

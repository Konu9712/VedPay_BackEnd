const mongoose = require("mongoose");
const User = require("../../database/Sechma/userSechma");
const { isEmpty } = require("../../validatorFunction/validator");
const contactService = require("./contactService");

class ContactController {
  /**
   * @description  Add money to wallet
   */
  async contact(req, res) {
    try {
      const errors = {};
      const { contactNumbers } = req.body;
      const { userId } = req.params;

      const userUserSechma = await User.findOne({ userId: userId });

      if (isEmpty(userUserSechma)) {
        errors.error = "Invalid User";
      }

      // Return Errors
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          status: "error",
          message: errors[Object.keys(errors)[0]],
          errors: {
            ...errors,
          },
        });
      }

      const result = await contactService.contact(contactNumbers);
      if (result) {
        return res.status(200).json({
          message: "ok",
          data: "All VedPay users",
          users: result,
        });
      } else {
        return res.status(400).json({
          error: "Error in loading your Contacts",
        });
      }
    } catch (e) {
      console.log("e", e);
      return res.status(400).json({ error: e });
    }
  }
}

const contactController = new ContactController();
module.exports = contactController;

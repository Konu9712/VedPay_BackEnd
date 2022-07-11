const mongoose = require("mongoose");
const User = require("../../database/Sechma/userSechma");
const common = require("../../helper/common");
const { isEmpty } = require("../../validatorFunction/validator");

class ContactService {
  contact = async (contactNumbers) => {
    let validUsers = [];
    let notUser = [];

    for (let i = 0; i < contactNumbers.length; i++) {
      let number = contactNumbers[i].phoneNumber;
      number = await number.replace(/\s/g, "").trim();
      number = await number.replace("-", "").trim();
      number = await number.replace("+91", "");
      const user = await User.findOne(
        {
          phoneNumber: number,
        },
        { name: 1, phoneNumber: 1 }
      );
      if (!isEmpty(user)) {
        validUsers.push(user);
      } else {
        notUser.push(contactNumbers[i].phoneNumber);
      }
    }

    const result = {
      validUsers,
      notUser,
    };
    return result;
  };
}
const contactService = new ContactService();
module.exports = contactService;

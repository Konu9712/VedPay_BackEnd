const express = require("express");
const router = express.Router();
const ContactController = require("./contact.controller");
const ContactValidator = require("./contact.validations");

/**
 * @route POST api/contact/:userId/contact
 * @description Get all contact  and find Users
 * @returns JSON
 * @access public
 */
router.post("/:userId/allUserContact", ContactValidator.contact, (req, res) => {
  ContactController.contact(req, res);
});

module.exports = router;

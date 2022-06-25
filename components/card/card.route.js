const express = require("express");
const router = express.Router();
const CardController = require("./card.controller");
const CardValidations = require("./card.validations");

/**
 * @route POST api/card/:userId/addCard
 * @description It Add card to DB
 * @returns JSON
 * @access public
 */
router.post("/:userId/addCard", CardValidations.addCard, (req, res) => {
  CardController.addCard(req, res);
});

module.exports = router;

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

/**
 * @route GET api/card/:userId/cardList
 * @description Get card list from DB
 * @returns JSON
 * @access public
 */
router.get("/:userId/cardlList", CardValidations.cardlList, (req, res) => {
  CardController.cardlList(req, res);
});

module.exports = router;

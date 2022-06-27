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

/**
 * @route Delete api/card/:userId/deleteCard/:cardId
 * @description Delete card list from DB
 * @returns JSON
 * @access public
 */
router.delete(
  "/:userId/deleteCard/:cardId",
  CardValidations.deleteCard,
  (req, res) => {
    CardController.deleteCard(req, res);
  }
);

module.exports = router;

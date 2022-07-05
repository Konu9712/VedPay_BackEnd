const express = require("express");
const router = express.Router();
const InMoneyController = require("./in.controller");
const InMoneyValidator = require("./in.validations");

/**
 * @route POST api/in/:userId/inMoney/:cardId
 * @description It Add Money in account
 * @returns JSON
 * @access public
 */
router.post(
  "/:userId/inMoney/:cardId",
  InMoneyValidator.inMoney,
  (req, res) => {
    InMoneyController.inMoney(req, res);
  }
);

module.exports = router;

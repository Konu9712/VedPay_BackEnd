const express = require("express");
const router = express.Router();
const OutMoneyController = require("./out.controller");
const OutMoneyValidator = require("./out.validations");

/**
 * @route POST api/in/:userId/outMoney/wallet
 * @description Transfer money from one account to another
 * @returns JSON
 * @access public
 */
router.post(
  "/:userId/outMoney/wallet",
  OutMoneyValidator.outMoney,
  (req, res) => {
    OutMoneyController.outMoney(req, res);
  }
);

module.exports = router;

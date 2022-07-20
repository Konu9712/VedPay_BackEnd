const express = require("express");
const router = express.Router();
const TransactionController = require("./transaction.controller");
const TransactionValidator = require("./transaction.validations");
/**
 * @route GET  api/transaction/:userId/contact/:contactNumber
 * @description Get transaction list between user and its contact
 * @returns JSON
 * @access public
 */
router.get(
  "/:userId/contact/:contactNumber",
  TransactionValidator.transactionContact,
  (req, res) => {
    TransactionController.transactionContact(req, res);
  }
);

/**
 * @route GET  api/transaction/:userId/global
 * @description Get latest 30 transactions list of user
 * @returns JSON
 * @access public
 */
router.get(
  "/:userId/global",
  TransactionValidator.transactionGlobal,
  (req, res) => {
    TransactionController.transactionGlobal(req, res);
  }
);

module.exports = router;

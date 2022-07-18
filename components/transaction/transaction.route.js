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

module.exports = router;

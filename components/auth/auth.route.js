const express = require("express");
const router = express.Router();
const AuthController = require("./auth.controller");
const AuthValidations = require("./auth.validations");

router.post("/test", (req, res) => {
  res.json({ message: "server is Running" });
});

/**
 * @route POST api/auth/signup-new
 * @description Sign up User
 * @returns JSON
 * @access public
 */
router.post("/signup", AuthValidations.signUp, (req, res) => {
  AuthController.signUp(req, res);
});

/**
 * @route POST api/auth/login
 * @description Login User
 * @returns JSON
 * @access public
 */
router.post("/login", AuthValidations.login, (req, res) => {
  AuthController.login(req, res);
});

/**
 * @route GET api/auth/totalBalance
 * @description Get User Total Balance
 * @returns JSON
 * @access public
 */
router.get(
  "/:userId/totalBalance",
  AuthValidations.totalBalance,
  (req, res) => {
    AuthController.totalBalance(req, res);
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const AuthController = require("./auth.controller");
const AuthValidations = require("./auth.validations");
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

module.exports = router;

const express = require("express");
const authenticateUser = require("../middleware/auth");
const {
  register,
  login,
  updateUser,
} = require("../controllers/authController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);

module.exports = router;

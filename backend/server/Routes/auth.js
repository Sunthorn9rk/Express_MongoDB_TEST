const express = require("express");
const router = express.Router();

const {
  register,
  login,
  currentUser,
  loginLine,
} = require("../Controllers/auth");

const {auth, adminCheck} = require("../Middleware/auth");

// http://localhost:5000/api/register
router.post("/register", register);

router.post("/login", login);

router.post("/login-line", loginLine);

// check role user
// ใส่ middleware auth ในการนำtoken มาเช็คก่อนผ่านเข้าไป
router.post("/current-user", auth, currentUser);

// check role admin
router.post("/current-admin", auth, adminCheck, currentUser);

module.exports = router;

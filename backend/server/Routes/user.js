const express = require("express");
const router = express.Router();

const {list, changRole} = require("../Controllers/user");

const {auth, adminCheck} = require("../Middleware/auth");

// http://localhost:5000/api/user
router.get("/user", auth, adminCheck, list);
router.post("/chang-role", auth, adminCheck, changRole);

module.exports = router;

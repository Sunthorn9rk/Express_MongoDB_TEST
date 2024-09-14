const jwt = require("jsonwebtoken");

const User = require("../Models/Users");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    if (!token) {
      return res.status(401).send("No Token");
    }
    const decoded = jwt.verify(token, "jwtsecret");

    // นำเอาชื่อ user ที่loginเข้ามา ไปใช้
    // เก็บข้อมูล user ไว้ใน req.user
    req.user = decoded.user;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("Token Invalid!!");
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    console.log(req.user.name);
    const userAdmin = await User.findOne({name: req.user.name})
      .select("-password")
      .exec();

    if (userAdmin.role !== "admin") {
      res.status(403).send("Admin access Denied!!");
    } else {
      next();
    }

    console.log(userAdmin);
  } catch (err) {
    console.log(err);
    red.status(403).send("Admin access Denied!!");
  }
};

const Users = require("../Models/Users");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // 1.Check user is already have in database?
    const {name, password} = req.body;

    var user = await Users.findOne({name});

    // ถ้ามี user อยู่แล้ว
    if (user) {
      return res.send("User Already Exists!!").status(400);
    }

    // 2.Encrypt password
    // สร้าง salt เพื่อ generate รหัสมั่วๆ 10 หลักเพื่อไปผสมกับรหัสของเราที่จะเข้ารหัส
    const salt = await bcrypt.genSalt(10);
    user = new Users({
      name,
      password,
    });
    user.password = await bcrypt.hash(password, salt);

    // 3.Save to Database
    await user.save();
    res.send("Register Success!!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  try {
    // 1.check User and Password
    const {name, password} = req.body;

    // ค้นหาใน database โดยค้นหา name และทำการ update({new: true}) ข้อมูลกลับไป เพื่อจะได้ updateเวลา เช่นเพื่ออยากจะดึง เวลาที่ login ล่าสุดตอนไหน
    var user = await Users.findOneAndUpdate({name}, {new: true});
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!");
      }

      // 2.make Payload
      var payload = {
        user: {
          name: user.name,
          role: user.role,
        },
      };

      // 3.Generate Token
      //   สร้าง token ใส่ไปกับ payload โดยกำหนดให้หมดอายุภายใน 1 วัน
      jwt.sign(payload, "jwtsecret", {expiresIn: "1d"}, (err, token) => {
        if (err) throw err;
        res.json({token, payload});
      });
    } else {
      // ถ้าหา user ไม่เจอ
      return res.status(400).send("User not Found!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.currentUser = async (req, res) => {
  try {
    console.log("currentUser", req.user);
    // ค้นหา user ในหลังบ้าน
    const user = await Users.findOne({name: req.user.name})
      .select("-password")
      .exec();
    // ส่งข้อมูลไปให้หน้าบ้าน
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

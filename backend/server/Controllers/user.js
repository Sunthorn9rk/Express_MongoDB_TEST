const Users = require("../Models/Users");

exports.list = async (req, res) => {
  try {
    // ค้นหา user ในหลังบ้าน
    const user = await Users.find({}).select("-password").exec();
    // ส่งข้อมูลไปให้หน้าบ้าน
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
exports.changRole = async (req, res) => {
  try {
    const {id, role} = req.body.data;

    // ค้นหา user ในหลังบ้าน
    const user = await Users.findOneAndUpdate(
      {_id: id},
      {role: role},
      {new: true}
    )
      .select("-password")
      .exec();
    // ส่งข้อมูลไปให้หน้าบ้าน
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

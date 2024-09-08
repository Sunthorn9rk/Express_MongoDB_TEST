const express = require("express");

// middleware
// morganเป็น middleware ที่ใช้ในการแสดง log ของ HTTP requests ที่เข้ามายังเซิร์ฟเวอร์ใน console
const morgan = require("morgan");
// corsเป็น middleware ที่ช่วยจัดการ CORS (Cross-Origin Resource Sharing) เพื่อให้ API สามารถรับ request จากโดเมนอื่น ๆ ได้
const cors = require("cors");
// bodyParseเป็น middleware ที่ช่วยแปลงข้อมูลที่ส่งมาใน request body ให้อยู่ในรูปแบบ JSON
const bodyParse = require("body-parser");

const connectDB = require("./Config/db");

const {readdirSync} = require("fs");
// const productRouters = require("./Routes/product");
// const authRouters = require("./Routes/auth");

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({limit: "10mb"}));

// Route 1
// app.get("/product", (req, res) => {
//   res.send("Hello Endpoint");
// });

// Route 2
// app.use("/api", productRouters);
// app.use("/api", authRouters);

// Route 3
readdirSync("./Routes").map((r) => app.use("", require("./Routes/" + r)));

app.listen(5000, () => console.log("Server Running on port 5000"));

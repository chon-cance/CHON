// src/routes/server.js
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const solapiRoutes = require("./routes/solapiRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const accommodationRoutes = require("./routes/accommodationRoutes.js");
const reservationRoutes = require("./routes/reservationRoute.js");

const app = express();
const url = `mongodb+srv://choncance:tmakxmdnpqdoq5!@choncance.nr4zf.mongodb.net/mydb?retryWrites=true&w=majority&appName=choncance`;

// 몽구스 라이브러리를 이용하여 몽고DB 연결
mongoose.connect(url);

// 기존 미들웨어
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기존 CORS 미들웨어 제거 또는 수정
app.use((req, res, next) => {
  console.log("cors 에러 해결?");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  ); // 모든 출처 허용
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // 모든 HTTP 메서드 허용

  res.setHeader("Access-Control-Allow-Credentials", "true"); // 모든 출처 허용

  next();
});

// Solapi 라우트
app.use("/alarm", solapiRoutes);

// User 라우트
app.use("/user", userRoutes);

// accommodation 라우트
app.use("/accommodations", accommodationRoutes);

// reservation 라우트
app.use("/reservations", reservationRoutes);

// 404 처리
// app.use((req, res) => {
//   res.status(404).json({ message: "Not Found" });
// });

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

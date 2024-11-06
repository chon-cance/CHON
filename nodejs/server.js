import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5175", // React 앱의 주소
    methods: ["GET"],
    credentials: true,
  })
);

// 날짜 형식을 ISO 문자열로 변경
const reservedDates = [
  new Date("2024-11-10").toISOString(),
  new Date("2024-11-15").toISOString(),
  new Date("2024-11-20").toISOString(),
];

app.get("/api/reserved-dates", (req, res) => {
  res.json(reservedDates);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

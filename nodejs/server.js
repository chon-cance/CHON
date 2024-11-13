import express from "express";
import cors from "cors";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: `http://localhost:5173`,
    methods: ["GET"],
    credentials: true,
  })
);

app.get("/api/reserved-dates", (req, res) => {
  res.send(reservedDates);
});

app.listen(PORT, () => {
  console.log(`Server is running on port 5000`);
});

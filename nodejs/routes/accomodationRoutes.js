// 숙소 관련 API

const express = require("express");
const router = express.Router();
const accomodationSchema = require("../models/accomodationSchema.js");

/**
 * 회원 목록
 */
router.get("/list", async (req, res) => {
  try {
    const accomodationData = await accomodationSchema.find();
    res.status(200).json(accomodationData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

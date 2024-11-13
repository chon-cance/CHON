// 숙소 관련 API

const express = require("express");
const router = express.Router();
const accomodationSchema = require("../models/accomodationSchema.js");

/**
 * 숙소 검색
 */
router.post("/login", async (req, res) => {
  try {
    const id = req.body.id;
    const password = req.body.password;

    const data = await userSchema.findOne({ id: id, password: password });

    if (data) {
      // 조회한 회원이 존재할 경우
      res.json({ id: data.id, name: data.name, phone: data.phone, user_type: data.user_type });
    } else {
      // 회원이 존재하지 않을 경우
      res.json({ message: "회원 정보를 찾을 수 없습니다." });
    }
  } catch (e) {
    res.json({ message: e });
  }
});

/**
 * 숙소 입력
 */
router.post("/join", async (req, res) => {
  try {
    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;
    const create_date = new Date();

    const idCheck = await userSchema.findOne({ id: id });
    if (!idCheck) {
      // 중복되는 id 없음 - 회원가입
      const data = await userSchema.create({
        id: id,
        password: password,
        name: name,
        phone: phone,
        user_type: 0,
        deleted: false,
        create_date: create_date,
        delete_date: 0,
        update_date: 0,
      });

      res.json({ message: "회원가입이 완료되었습니다." });
    } else {
      // ID 중복
      res.json({ message: "해당 ID는 사용중입니다." });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

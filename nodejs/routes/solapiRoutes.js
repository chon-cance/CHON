// routes/solapiRoutes.js
const express = require("express");
const router = express.Router();
const { SolapiMessageService } = require("solapi");

// API 키와 시크릿 키를 사용하여 메시지 서비스 인스턴스 생성
const api_key = process.env.API_KEY || "";
const api_secret = process.env.API_SECRET || "";
const messageService = new SolapiMessageService(api_key, api_secret);

// 알림톡 메시지 발송 라우트
router.post("/send-message", async (req, res) => {
  const { name, text, tel, btn_url, disableSms } = req.body;
  try {
    const response = await messageService.send({
      to: tel,
      from: process.env.SOLAPI_PHONE, // 발신번호를 넣는곳이나 솔라피에서 등록을 해야함. 문자로 대체 발송될 경우를 위해서.
      kakaoOptions: {
        pfId: process.env.SOLAPI_PFID,
        templateId: process.env.SOLAPI_TEMPLATE_ID,
        variables: {
          "#{name}": name || "",
          "#{text}": text || "",
          "#{url}": btn_url || "",
        },
        disableSms: disableSms || false, // 기본값(false) - 알림톡 실패시 SMS로 대체 발송함
      },
    });

    res.json({
      success: true,
      message: "알림톡 전송 성공",
      data: response,
    });
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.status === 401 ? "인증 실패" : "메시지 전송 실패",
      error: error.message,
    });
  }
});

module.exports = router;

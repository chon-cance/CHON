import React from "react";
import FormGroup from "./FormGroup";
import CheckboxGroup from "./CheckboxGroup";
import styles from "./Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
    passwordCheck: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password" || name === "passwordCheck") {
      const otherField = name === "password" ? "passwordCheck" : "password";
      if (formData[otherField] && value !== formData[otherField]) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 모든 필드 입력 확인
      if (!formData.name) {
        window.alert("이름을 입력해주세요.");
        return;
      }

      if (!formData.id) {
        window.alert("아이디를 입력해주세요.");
        return;
      }

      if (!formData.password) {
        window.alert("비밀번호를 입력해주세요.");
        return;
      }

      if (!formData.passwordCheck) {
        window.alert("비밀번호 확인을 입력해주세요.");
        return;
      }

      if (!formData.phone) {
        window.alert("휴대폰 번호를 입력해주세요.");
        return;
      }

      // 비밀번호 검증
      if (formData.password !== formData.passwordCheck) {
        window.alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 비밀번호 길이 검증
      if (formData.password.length < 8) {
        window.alert("비밀번호는 8자 이상이어야 합니다.");
        return;
      }

      // 전화번호 형식 검증
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(formData.phone)) {
        window.alert("올바른 전화번호 형식이 아닙니다.");
        return;
      }

      // 모든 검증을 통과한 경우에만 서버 요청
      const response = await fetch("http://192.168.0.72:8080/user/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.message === "success") {
        await new Promise((resolve) => {
          window.alert("회원가입이 완료되었습니다.");
          resolve();
        }).then(() => {
          navigate("/");
        });
      } else {
        window.alert(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      window.alert("서버 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <FormGroup
        label="이름"
        type="text"
        placeholder="이름을 입력해주세요"
        value={formData.name || ""}
        onChange={handleChange}
        name="name"
      />
      <FormGroup
        label="아이디"
        type="text"
        placeholder="아이디를 입력해주세요"
        value={formData.id || ""}
        onChange={handleChange}
        name="id"
      />
      <FormGroup
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={formData.password || ""}
        onChange={handleChange}
        name="password"
      />
      <FormGroup
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={formData.passwordCheck || ""}
        onChange={handleChange}
        name="passwordCheck"
      />
      {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
      <FormGroup
        label="휴대폰 번호"
        type="tel"
        placeholder="휴대폰 번호를 - 없이 입력해주세요"
        value={formData.phone || ""}
        onChange={handleChange}
        name="phone"
      />
      <CheckboxGroup label="개인정보 처리 및 카카오톡을 통한 알림톡 전송에 동의합니다." />
      <p className={styles.errorMessage}>{passwordError}</p>

      <button
        type="submit"
        className={styles.registerForm_Btn}
        disabled={isLoading}
      >
        {isLoading ? "처리중..." : "회원가입"}
      </button>
    </form>
  );
};

export default RegisterForm;

import React from "react";
import FormGroup from "./FormGroup";
import CheckboxGroup from "./CheckboxGroup";
import styles from "./Register.module.css";

const RegisterForm = () => {
  return (
    <form className={styles.resisterForm}>
      <FormGroup label="이름" type="text" placeholder="이름을 입력해주세요" />
      <FormGroup
        label="아이디"
        type="text"
        placeholder="아이디를 입력해주세요"
      />
      <FormGroup
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
      <FormGroup
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
      <FormGroup
        label="휴대폰 번호"
        type="tel"
        placeholder="휴대폰 번호를 - 없이 입력해주세요"
      />
      <CheckboxGroup label="개인정보 처리 및 카카오톡을 통한 알림톡 전송에 동의합니다." />
      <button type="submit" className={styles.resisterForm_Btn}>
        회원가입
      </button>
    </form>
  );
};

export default RegisterForm;

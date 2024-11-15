import React from "react";
import logo from "/img/logo4.png";
import styles from "./Register.module.css";

const RegisterFormHeader = () => {
  return (
    <div className={styles.form_header}>
      <img className={styles.logo} src={logo} alt="Logo" />
      <h1 className={styles.resister}>회원가입</h1>
      <p className={styles.subtitle}>
        이미 촌스럽게에 회원가입 되어있다면?{" "}
        <a className={styles.loginBtn}>로그인</a>
      </p>
    </div>
  );
};

export default RegisterFormHeader;

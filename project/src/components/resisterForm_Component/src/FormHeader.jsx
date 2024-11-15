import React from "react";
import logo from "./img/logo2.png";
import "./App.css";

const FormHeader = () => {
  return (
    <div className="form-header">
      <img className="logo" src={logo} alt="Logo" />
      <h1 className="resister">회원가입</h1>
      <p className="subtitle">
        이미 촌스럽게에 회원가입 되어있다면? <a className="loginBtn">로그인</a>
      </p>
    </div>
  );
};

export default FormHeader;

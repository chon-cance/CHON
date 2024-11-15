import React from "react";
import logo from "./img/logo2.png";
import "./App.css";

const FormHeader = () => {
  return (
    <div className="form-header">
      <img className="logo" src={logo} alt="Logo" />
      <h1 className="resister">로그인</h1>
      <p className="subtitle">특별한 촌캉스를 경험해보세요</p>
    </div>
  );
};

export default FormHeader;

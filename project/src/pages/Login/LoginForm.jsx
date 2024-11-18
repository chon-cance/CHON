import FormGroup from "./FormGroup";
import ResisterTag from "./ResisterTag";
import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("로그인 시도:", formData);

      const response = await fetch("http://192.168.0.72:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("서버 응답:", response);

      const data = await response.json();
      console.log("응답 데이터:", data);

      if (response.ok) {
        if (data.id) {
          console.log("로그인 성공:", data);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        } else {
          console.log("로그인 실패:", data.message);
          setError(data.message);
        }
      } else {
        console.log("로그인 에러:", data.message);
        setError(data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 호출 에러:", error);
      setError("서버 연결에 실패했습니다.");
    }
  };

  return (
    <form className={styles.resisterForm} onSubmit={handleSubmit}>
      <FormGroup
        label="아이디"
        type="text"
        placeholder="아이디를 입력해주세요"
        value={formData.id}
        onChange={handleChange}
        name="id"
      />
      <FormGroup
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={formData.password}
        onChange={handleChange}
        name="password"
      />
      <ResisterTag />
      <button type="submit" className={styles.loginForm_Btn}>
        로그인
      </button>
    </form>
  );
};

export default LoginForm;

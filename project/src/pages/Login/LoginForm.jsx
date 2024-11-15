import FormGroup from "./FormGroup";
import ResisterTag from "./ResisterTag";
import styles from "./Login.module.css";

const LoginForm = () => {
  return (
    <form className={styles.resisterForm}>
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
      <ResisterTag />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;

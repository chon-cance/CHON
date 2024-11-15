import styles from "./Login.module.css";

const FormGroup = ({ label, type, placeholder }) => {
  return (
    <div className={styles.form_group}>
      <label className={styles.NameFont}>{label}</label>
      <input
        className={styles.textBoxText}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormGroup;

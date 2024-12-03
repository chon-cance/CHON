import React from "react";
import styles from "./Register.module.css";

const CheckboxGroup = ({ label, checked, onChange }) => {
  return (
    <div className={styles.checkbox_group}>
      <label className={styles.checkbox_label}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={styles.checkbox_text}>{label}</span>
      </label>
    </div>
  );
};

export default CheckboxGroup;

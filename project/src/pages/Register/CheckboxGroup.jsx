import React from "react";
import styles from "./Register.module.css";

const CheckboxGroup = ({ label }) => {
  return (
    <div className={styles.checkbox_group}>
      <label className={styles.checkbox_label}>
        <input type="checkbox" />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default CheckboxGroup;

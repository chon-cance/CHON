import styles from "./Footer.module.css";
import textImg1 from "../../assets/img/footer_text1.png";
import textImg2 from "../../assets/img/footer_text2.png";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.footer_text}>
          <img src={textImg1} alt="" />
          <img src={textImg2} alt="" />
        </div>
        <button className={styles.footer_Btn}>숙소 검색하기</button>
      </div>
    </footer>
  );
}

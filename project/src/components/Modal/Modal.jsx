import styles from "./Modal.module.css";

export default function Modal() {
  return (
    <div className={styles.dialog}>
      <div className={styles.closeBtn_warp}>
        <button className={styles.closeBtn}>⨯</button>
      </div>

      <div>
        <div>
          <div>사진</div>
          <div className={styles.dddd}>
            <div>숙소정보</div>
            <div>예약폼</div>
          </div>
        </div>
        <div>후기</div>
      </div>
    </div>
  );
}

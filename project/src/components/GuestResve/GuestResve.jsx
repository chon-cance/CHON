import styles from "./GuestResve.module.css";

export default function GuestResve() {
  return (
    <div className={styles.guestResve}>
      <div className={styles.guestResve_main}>
        <div className={styles.guestResve_title}>
          <p>예약 신청 확인하기</p>
        </div>
        <div className={styles.approvalResult}>
          <p>승인 대기</p>
        </div>
        <div className={styles.guestResve_box}>
          <div className={styles.houseName}>자연사랑황토펜션</div>
          <div className={styles.host_infoWarp}>
            <div className={styles.host_info}>
              <div></div>
              <div></div>
            </div>
            <div className={styles.guest_infoValue}>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className={styles.guest_infoWarp}>
          <div className={styles.guest_info}>
            <div>게스트</div>
            <div>체크인</div>
            <div>체크아웃</div>
            <div>인원수</div>
          </div>
          <div className={styles.guest_infoValue}>
            <div>홍길동</div>
            <div>2024.11.11</div>
            <div>2024.11.12</div>
            <div>2명</div>
          </div>
        </div>
        <div className={styles.guestResve_btn}>
          <div>예약취소</div>
        </div>
      </div>
    </div>
  );
}

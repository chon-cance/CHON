import styles from "./HostResve.module.css";
import logo3 from "../../assets/img/logo3.png";
import exit from "../../assets/img/exit.png";
import resve from "../../assets/img/resve.png";

export default function HostResve() {
  return (
    <div className={styles.hostResve}>
      <div className={styles.hostResve_header}>
        <div className={styles.hostResve_logo}>
          <img src={logo3} alt="" />
        </div>
        <div className={styles.exit}>
          <a href="">
            <p>나가기</p>
            <img src={exit} alt="" />
          </a>
        </div>
      </div>
      <div className={styles.hostResve_main}>
        <div className={styles.userName}>
          <b>자연사랑황토펜션</b>님
        </div>
        <div className={styles.hostResve_title}>
          <img src={resve} alt="" />
          <p>예약 관리</p>
        </div>
        <div className={styles.approvalResult}>
          <p>승인 대기</p>
        </div>
        <div className={styles.hostResve_box}>
          <div className={styles.guest_info}>
            <div>게스트</div>
            <div></div>
            <div>체크인</div>
            <div>체크아웃</div>
            <div>인원수</div>
            <div>전달사항</div>
          </div>
          <div className={styles.guest_infoValue}>
            <div>홍길동</div>
            <div></div>
            <div>2024.11.11</div>
            <div>2024.11.12</div>
            <div>2명</div>
            <div>집에 가면 안될까요?</div>
          </div>
        </div>
        <div className={styles.hostResve_btn}>
          <div>승인</div>
          <div>거절</div>
        </div>
      </div>
    </div>
  );
}

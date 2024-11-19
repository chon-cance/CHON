import styles from "./HostResve.module.css";
import logo3 from "/img/logo3.png";
import exit from "/img/exit.png";
import resve from "/img/resve.png";
import { useState, useEffect } from "react";
import { ShowAlert, ShowConfirm, ShowLoading } from "../../AlertUtils.js";

export default function HostResve({ id }) {
  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState({
    state: "승인대기",
    color: { color: "red" },
    view: true,
  });

  const fetchReservationData = async () => {
    try {
      const response = await fetch(`http://192.168.0.72:8080/reservations/?reservationId=${id}`);

      const data = await response.json();

      if (data.state == "confirm") {
        setReservation({ state: "승인완료", color: { color: "#394A4B" }, view: false });
      } else if (data.state == "decline") {
        setReservation({ state: "승인거절", color: { color: "#a6a6a6" }, view: false });
      } else if (data.state == "delete") {
        setReservation({ state: "취소된 예약", color: { color: "red" }, view: false });
      }

      setReservationData(data); // 예약 정보 저장
    } catch (err) {
      setError("예약 정보를 불러오는 데 실패했습니다."); // 오류 처리
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 실행이 완료된 후 useEffect 실행
  useEffect(() => {
    fetchReservationData();
  }, []);

  async function reservationConfirm() {
    try {
      const response = await fetch(`http://192.168.0.72:8080/reservations/confirm/${id}`, {
        method: "PUT", // 필요한 HTTP 메서드 설정
      });

      if (!response.ok) {
        throw new Error("네트워크 응답이 좋지 않습니다.");
      }

      const data = await response.json();

      setReservation({ state: "승인완료", color: { color: "#394A4B" }, view: false });
      ShowAlert("success", "성공", data.message);
      // alert(data.message); // 받은 메시지를 alert로 표시
    } catch (e) {
      ShowAlert("fail", "실패", "예약 승인 요청에 실패했습니다.");
      // alert("예약 승인 요청에 실패했습니다."); // 오류 처리
    }
  }

  async function reservationDecline() {
    try {
      const response = await fetch(`http://192.168.0.72:8080/reservations/decline/${id}`, {
        method: "PUT", // 필요한 HTTP 메서드 설정
      });

      if (!response.ok) {
        throw new Error("네트워크 응답이 좋지 않습니다.");
      }

      const data = await response.json();

      setReservation({ state: "승인거절", color: { color: "#a6a6a6" }, view: false });
      ShowAlert("success", "성공", data.message);
      // alert(data.message); // 받은 메시지를 alert로 표시
    } catch (e) {
      ShowAlert("fail", "실패", "예약 거절 요청에 실패했습니다.");
      // alert("예약 거절 요청에 실패했습니다."); // 오류 처리
    }
  }

  return (
    <div className={styles.hostResve}>
      <div className={styles.hostResve_header}>
        <div className={styles.hostResve_logo}>
          <img src={logo3} alt="" />
        </div>
        <div className={styles.exit}>
          <a href="">
            <p>뒤로가기</p>
            <img src={exit} alt="" />
          </a>
        </div>
      </div>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservationData && (
        <div className={styles.hostResve_main}>
          <div className={styles.userName}>
            <b>{reservationData.accommodationId.name}</b> 님
          </div>
          <div className={styles.hostResve_title}>
            <img src={resve} alt="" />
            <p>예약 관리</p>
          </div>
          <div className={styles.approvalResult}>
            <p style={reservation.color}>{reservation.state}</p>
          </div>
          <div className={styles.hostResve_box}>
            <div className={styles.guest_info}>
              <div>게스트</div>
              {reservation.state == "승인완료" && !reservation.view && <div>전화번호</div>}
              <div>체크인</div>
              <div>체크아웃</div>
              <div>인원수</div>
              <div>전달사항</div>
            </div>
            <div className={styles.guest_infoValue}>
              <div>{reservationData.userId.name}</div>
              {reservation.state == "승인완료" && !reservation.view && <div>{reservationData.userId.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</div>}
              <div>{reservationData.startDate.split("T")[0]}</div>
              <div>{reservationData.endDate.split("T")[0]}</div>
              <div>{reservationData.person}</div>
              <div>{reservationData.message}</div>
            </div>
          </div>
          <div className={styles.hostResve_btn}>
            {reservationData.state == "await" && reservation.view && (
              <>
                <div onClick={reservationConfirm}>승인</div>
                <div onClick={reservationDecline}>거절</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

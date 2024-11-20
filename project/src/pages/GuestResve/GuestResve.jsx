import styles from "./GuestResve.module.css";
import logo3 from "/img/logo3.png";
import { useState, useEffect } from "react";
import { ShowAlert, ShowConfirm, ShowLoading } from "../../utils/AlertUtils.js";

export default function GuestResve({ id }) {
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
      const response = await fetch(
        `http://192.168.0.72:8080/reservations/?reservationId=${id}`
      );

      const data = await response.json();

      if (data.state == "confirm") {
        setReservation({
          state: "승인완료",
          color: { color: "#394A4B" },
          view: true,
        });
      } else if (data.state == "decline") {
        setReservation({
          state: "승인거절",
          color: { color: "#a6a6a6" },
          view: false,
        });
      } else if (data.state == "delete") {
        setReservation({
          state: "취소된 예약",
          color: { color: "red" },
          view: false,
        });
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

  async function reservationDelete() {
    const confirmCancel = await ShowConfirm(
      "question",
      "예약을 취소하시겠습니까?"
    );
    // window.confirm("예약을 취소하시겠습니까?");

    if (confirmCancel.isConfirmed) {
      // 확인 클릭 시 예약 취소 함수 호출
      try {
        const response = await fetch(
          `http://192.168.0.72:8080/reservations/delete/${id}`,
          {
            method: "PUT", // 필요한 HTTP 메서드 설정
          }
        );

        if (!response.ok) {
          throw new Error("네트워크 응답이 좋지 않습니다.");
        }
        const data = await response.json();
        setReservation({
          state: "취소된 예약",
          color: { color: "red" },
          view: false,
        });

        ShowAlert("success", "성공", data.message);
        // alert(data.message); // 받은 메시지를 alert로 표시
      } catch (e) {
        ShowAlert("fail", "실패", "예약 취소에 실패했습니다.");
        // alert("예약 취소에 실패했습니다."); // 오류 처리
      }
    }
  }

  return (
    <div className={styles.guestResve}>
      <div className={styles.guestResve_header}>
        <div>
          <img src={logo3} alt="" />
        </div>
      </div>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservationData && (
        <div className={styles.guestResve_main}>
          <div className={styles.guestResve_title}>
            <p>예약 신청 확인하기</p>
          </div>
          <div className={styles.approvalResult}>
            <p style={reservation.color}>{reservation.state}</p>
          </div>
          <div className={styles.guestResve_box}>
            <div className={styles.houseName}>
              {reservationData.accommodationId.name}
            </div>
            {reservationData.state == "confirm" && (
              <div>
                <div className={styles.host_flex}>
                  <div className={styles.host_info}>숙소주소</div>
                  <div className={styles.host_infoValue}>
                    {reservationData.accommodationId.address}
                  </div>
                </div>
                <div className={styles.host_flex}>
                  <div className={styles.host_info}>전화번호</div>
                  <div className={styles.host_infoValue}>
                    {reservationData.accommodationId.phone.replace(
                      /(\d{3})(\d{4})(\d{4})/,
                      "$1-$2-$3"
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.guest_infoWarp}>
            <div className={styles.guest_info}>
              <div>게스트</div>
              <div>체크인</div>
              <div>체크아웃</div>
              <div>인원수</div>
              <div>전달사항</div>
            </div>
            <div className={styles.guest_infoValue}>
              <div>{reservationData.userId.name}</div>
              <div>{reservationData.startDate.split("T")[0]}</div>
              <div>{reservationData.endDate.split("T")[0]}</div>
              <div>{reservationData.person}</div>
              <div>{reservationData.message}</div>
            </div>
          </div>
          {reservation.view && (
            <div className={styles.guestResve_btn}>
              <div onClick={reservationDelete}>예약취소</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

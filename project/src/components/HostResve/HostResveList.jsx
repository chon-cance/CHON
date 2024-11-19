import styles from "./HostResve.module.css";
import logo3 from "/img/logo3.png";
import exit from "/img/exit.png";
import resve from "/img/resve.png";
import { useState, useEffect } from "react";
import { ShowAlert, ShowConfirm, ShowLoading } from "../../AlertUtils.js";

export default function HostResveList({ id }) {
  const [reservationData, setReservationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState({
    state: "승인대기",
    color: { color: "red" },
    view: true,
  });
  let reservationIds = [];

  const fetchReservation = async () => {
    try {
      const response = await fetch(`http://192.168.0.72:8080/accomodations/reservation?accomodationId=${id}`);

      const data = await response.json();
      reservationIds = data.reservationIds;

      const fetchedReservations = await Promise.all(reservationIds.map((id) => fetchReservationData(id)));
      setReservationData(fetchedReservations);
      setLoading(false);

      const fetchReservationData = async (id) => {
        try {
          const response = await fetch(`http://192.168.0.72:8080/reservations/?reservationId=${id}`);
          if (!response.ok) {
            throw new Error("예약 정보를 불러오는 데 실패했습니다.");
          }
          return await response.json(); // JSON으로 변환하여 반환
        } catch (error) {
          console.error(error);
          return null; // 오류 발생 시 null 반환
        }
      };

      //   if (data.state == "confirm") {
      //     setReservation({ state: "승인완료", color: { color: "#394A4B" }, view: false });
      //   } else if (data.state == "decline") {
      //     setReservation({ state: "승인거절", color: { color: "#a6a6a6" }, view: false });
      //   } else if (data.state == "delete") {
      //     setReservation({ state: "취소된 예약", color: { color: "red" }, view: false });
      //   }

      //   setReservationData(data); // 예약 정보 저장
    } catch (err) {
      setError("예약 정보를 불러오는 데 실패했습니다."); // 오류 처리
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 실행이 완료된 후 useEffect 실행
  useEffect(() => {
    fetchReservation();
  }, []);

  return (
    <div className={styles.hostResve}>
      <div className={styles.hostResve_header}>
        <div className={styles.hostResve_logo}>
          <img src={logo3} alt="" />
        </div>
      </div>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservationIds &&
        reservationIds.map((res, index) => {
          <div className={styles.hostResve_main} key={index}>
            <div className={styles.userName}>
              <b>{/* {reservationData.accommodationId.name} */}</b> 님
            </div>
            <div className={styles.hostResve_title}>
              <img src={resve} alt="" />
              <p>예약 관리</p>
            </div>
            <div className={styles.approvalResult}>
              <p style={reservation.color}>{reservation.state}</p>
            </div>
            <div className={styles.hostResve_box}>
              <div className={styles.guest_infoValue}>
                <div>{reservationData.userId.name}</div>
                {reservation.state == "승인완료" && !reservation.view && <div>{reservationData.userId.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</div>}
                <div>
                  {reservationData.startDate.split("T")[0]} - {reservationData.endDate.split("T")[0]}
                </div>
              </div>
              <div>승인대기</div>
            </div>
          </div>;
        })}
    </div>
  );
}

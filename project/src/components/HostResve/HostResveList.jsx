import styles from "./HostResveList.module.css";
import logo3 from "/img/logo3.png";
import resve from "/img/resve.png";
import { useState, useEffect } from "react";
// import { ShowAlert, ShowConfirm, ShowLoading } from "../../AlertUtils.js";

export default function HostResveList({ id }) {
  const [reservationData, setReservationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accommodationName, setAccommodationName] = useState("");

  const fetchReservation = async () => {
    try {
      const acc_response = await fetch(`http://192.168.0.72:8080/accommodations/detail?accommodationId=${id}`);
      const acc_data = await acc_response.json();
      setAccommodationName(acc_data.name);

      const response = await fetch(`http://192.168.0.72:8080/accommodations/reservations?accommodationId=${id}`);

      const data = await response.json();
      const reservationDatas = data.reservationData;

      setReservationData(reservationDatas); // 예약 정보 저장
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
      <div className={styles.hostResve_main}>
        <div className={styles.userName}>
          <b>{accommodationName}</b> 님
        </div>
        <div className={styles.hostResve_title}>
          <img src={resve} alt="" />
          <p>예약 관리</p>
        </div>
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {reservationData &&
          reservationData.map((res, index) => {
            let resState = { state: "승인대기", color: { color: "red" } };
            if (res.state == "confirm") {
              resState = { state: "승인완료", color: { color: "#394A4B" } };
            } else if (res.state == "decline") {
              resState = { state: "승인거절", color: { color: "#a6a6a6" } };
            } else if (res.state == "delete") {
              resState = { state: "취소된 예약", color: { color: "red" } };
            }
            return (
              <div className={styles.hostResve_box} key={index}>
                <div className={styles.guest_infoValue}>
                  {res.userId.name}
                  <br /> {res.startDate.split("T")[0]} - {res.endDate.split("T")[0]}
                </div>
                <div className={styles.resveState} style={resState.color}>
                  {resState.state}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

import styles from "../HostResveList.module.css";
import { useNavigate } from "react-router-dom";

export default function ReservationItem({ reservation }) {
  const navigate = useNavigate();

  let resState = { state: "승인대기", color: { color: "red" } };

  if (reservation.state === "confirm") {
    resState = { state: "승인완료", color: { color: "#394A4B" } };
  } else if (reservation.state === "decline") {
    resState = { state: "승인거절", color: { color: "#a6a6a6" } };
  } else if (reservation.state === "delete") {
    resState = { state: "취소된 예약", color: { color: "red" } };
  }

  const handleClick = () => {
    navigate(`/host/resve/${reservation._id}`); // 예약 상세 페이지로 이동
  };

  return (
    <div
      className={styles.hostResve_box}
      onClick={handleClick}
      style={{ cursor: "pointer" }} // 클릭 가능함을 표시
    >
      <div className={styles.guest_infoValue}>
        {reservation.userId.name}
        <br /> {reservation.startDate.split("T")[0]} -{" "}
        {reservation.endDate.split("T")[0]}
      </div>
      <div className={styles.resveState} style={resState.color}>
        {resState.state}
      </div>
    </div>
  );
}

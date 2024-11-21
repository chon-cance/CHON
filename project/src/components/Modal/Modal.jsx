import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "swiper/css";
import styles from "./Modal.module.css";
import icon1 from "./icon/map-pin.png";
import icon2 from "./icon/users.png";
import reservation from "../../../../nodejs/schema/reservation";

export default function Modal({ accommodation, onClose }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [requests, setRequests] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePhotoClick = (index) => setCurrentPhoto(index);

  const guestAlarm = async () => {
    try {
      const alarmData = {
        reservationId: reservation._id,
        url: `http://192.168.0.72:8080/guest/${reservation._id}`,
      };

      const response = await fetch(
        "http://192.168.0.72:8080/alarm/request_guest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alarmData),
        }
      );

      if (!response.ok) {
        throw new Error("알람 전송에 실패했습니다.");
      }

      const data = await response.json();
      console.log("알람 전송 성공:", data);
    } catch (error) {
      console.error("알람 전송 실패:", error);
    }
  };

  const hostAlarm = async () => {
    try {
      const alarmData = {
        reservationId: reservation._id,
        url: `http://192.168.0.72:8080/host/${reservation.accommodationId}`,
      };

      const response = await fetch(
        "http://192.168.0.72:8080/alarm/request_host",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alarmData),
        }
      );

      if (!response.ok) {
        throw new Error("알람 전송에 실패했습니다.");
      }

      const data = await response.json();
      console.log("알람 전송 성공:", data);
    } catch (error) {
      console.error("알람 전송 실패:", error);
    }
  };

  const handleReservation = async () => {
    try {
      if (!user) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
        return;
      }

      if (!checkIn || !checkOut || !guests) {
        alert("모든 필수 항목을 입력해주세요.");
        return;
      }

      const reservationData = {
        accommodationId: accommodation._id,
        userId: user._id,
        startDate: new Date(checkIn).toISOString(),
        endDate: new Date(checkOut).toISOString(),
        person: parseInt(guests),
        message: requests || "",
      };

      console.log("Sending reservation data:", reservationData);

      const response = await fetch(
        "http://192.168.0.72:8080/reservations/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("예약이 완료되었습니다.");
        setCheckIn("");
        setCheckOut("");
        setGuests(1);
        setRequests("");
        onClose();
        guestAlarm();
        hostAlarm();
      } else {
        throw new Error(data.message || "예약 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Reservation error:", error);
      setError(error.message);
      alert(error.message);
    }
  };

  // 별점 렌더링 함수 (노란색으로 색상 지정)
  const renderStars = (grade) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`${styles.star} ${
          i < grade ? styles.activeStar : styles.star
        }`}
        style={{ color: i < grade ? "gold" : "#dddddd" }} // 별 색을 노란색과 회색으로 지정
      >
        ★
      </span>
    ));
  };

  // 평균 별점 계산
  const calculateAverageGrade = () => {
    const grade = accommodation.grade; // accommodation의 grade를 별점으로 사용
    return grade.toFixed(1); // 소수점 첫째 자리까지 계산
  };

  // 리뷰 날짜 추출 함수 (임의로 날짜 추가)
  const getReviewDate = (index) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    // 현재 날짜를 가져옵니다.
    const today = new Date();
    const randomDays = Math.floor(Math.random() * today.getDate()); // 0부터 오늘 날짜까지의 랜덤한 일수

    // 랜덤한 이전 날짜를 계산합니다.
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() - randomDays);

    // const date = new Date(accommodation.create_date);
    // date.setDate(date.getDate() + index); // 임의로 리뷰마다 날짜를 다르게 설정
    const formattedDate = randomDate
      .toLocaleDateString("ko-KR", options)
      .replace(/\./g, "-");
    const finalDate = formattedDate.endsWith("-")
      ? formattedDate.slice(0, -1)
      : formattedDate;
    return finalDate; // 'yyyy-mm-dd' 형식으로 변환
  };

  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <div className={styles.headerSection}>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            modules={[]} // Pagination 모듈 제거
            className="mySwiper"
          >
            {accommodation.photo.map((photo, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`/img/${accommodation.accommodation_num}/${photo}`}
                  alt={`숙소 이미지 ${index + 1}`}
                  className={styles.mainImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.infoSection}>
            <h2>{accommodation.name}</h2>
            <p className={styles.description}>{accommodation.explain}</p>

            <div className={styles.locationAndDetails}>
              <p className={styles.detail}>
                <img src={icon1} alt="지도 아이콘" className={styles.icon} />
                {accommodation.address}
              </p>
              <p className={styles.detail}>
                <img src={icon2} alt="인원 아이콘" className={styles.icon} />
                기준 {accommodation.person}명 / 최대 {accommodation.max_person}{" "}
                명
              </p>
            </div>

            <p className={styles.price}>
              ₩ {accommodation.price.toLocaleString()}
            </p>
          </div>

          <div className={styles.reservationSection}>
            <div className={styles.reser_box}>
              <div className={styles.dateSection}>
                <div className={styles.inputGroup}>
                  <label>체크인</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>체크아웃</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>인원수</label>
                  <input
                    type="number"
                    min={1}
                    max={accommodation.max_person}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className={styles.inputGroup}>
                  <textarea
                    rows={3}
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="전달사항을 기입해주세요."
                  ></textarea>
                </div>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            <button
              className={styles.reserveButton}
              onClick={handleReservation}
            >
              예약 신청하기
            </button>
          </div>
        </div>

        <div className={styles.reviewSection}>
          <div className={styles.reviewTitle}>
            <div className={styles.reviewH3}>후기</div>
            <span className={styles.starAndNumber}>
              {/* 별 하나 표시, 색을 노란색으로 설정 */}
              <span className={styles.star} style={{ color: "gold" }}>
                {"★"}
              </span>
              <span className={styles.averageRating}>
                {/* 평균 별점 숫자 표시 */}
                {calculateAverageGrade()} ({accommodation.review.length})
              </span>
            </span>
          </div>
          <Swiper
            slidesPerView={3} // 한 번에 3개 리뷰 표시
            spaceBetween={20} // 리뷰 간 간격 설정
            modules={[]} // Pagination 모듈 제거
            className="mySwiper"
          >
            {accommodation.review.map((review, index) => (
              <SwiperSlide key={index}>
                <div className={styles.reviewItem}>
                  <div className={styles.starRating}>
                    <div className={styles.starsWrapper}>
                      {/* 별점 표시 (여전히 별점 개수 표시) */}
                      {renderStars(accommodation.grade)}
                    </div>
                    <div className={styles.reviewDate}>
                      {/* 별점 옆에 등록일 표시 */}
                      {getReviewDate(index)} {/* 리뷰 날짜 표시 */}
                    </div>
                  </div>
                  <p>{review}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

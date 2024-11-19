import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./Modal.module.css";
import icon1 from "./icon/map-pin.png";
import icon2 from "./icon/users.png";

export default function Modal({ accommodation, onClose }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [requests, setRequests] = useState("");

  const handlePhotoClick = (index) => setCurrentPhoto(index);

  const handleReservation = () => {
    setCheckIn("");
    setCheckOut("");
    setGuests(1);
    setRequests("");
  };

  // 별점 렌더링 함수
  const renderStars = (grade) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`${styles.star} ${i < grade ? styles.activeStar : ""}`}
      >
        ★
      </span>
    ));
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <div className={styles.headerSection}>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination]}
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
            <p className={styles.address}>
              <img src={icon1} alt="지도 아이콘" className={styles.icon} />{" "}
              {accommodation.address}
            </p>
            <p className={styles.details}>
              <img src={icon2} alt="인원 아이콘" className={styles.icon} /> 기준{" "}
              {accommodation.person}명 / 최대 {accommodation.max_person}명
            </p>
            <p>{accommodation.explain}</p>
            <p className={styles.price}>
              ₩ {accommodation.price.toLocaleString()}
            </p>
          </div>

          <div className={styles.reservationSection}>
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

            <div className={styles.inputGroup}>
              <label>요청사항</label>
              <textarea
                rows={3}
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                placeholder="요청사항을 입력해주세요."
              ></textarea>
            </div>

            <button
              className={styles.reserveButton}
              onClick={handleReservation}
            >
              예약 신청하기
            </button>
          </div>
        </div>

        <div className={styles.reviewSection}>
          <h3>후기 ({accommodation.review.length})</h3>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {accommodation.review.map((review, index) => (
              <SwiperSlide key={index}>
                <div className={styles.reviewItem}>
                  <div className={styles.starRating}>
                    {renderStars(accommodation.grade)}
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

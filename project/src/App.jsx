import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import MySwiper from "./components/Swiper";
import Rating from "./components/Rating";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const CalendarComponent = () => {
  const [reservedDates, setReservedDates] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [selectingCheckIn, setSelectingCheckIn] = useState(true); // true: 체크인 선택 중, false: 체크아웃 선택 중
  const [rating, setRating] = useState(0);

  // 예약된 날짜 가져오기
  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/reserved-dates"
        );
        const data = await response.json();
        const dates = data.map((date) => new Date(date));
        console.log("Reserved dates:", dates);
        setReservedDates(dates);
      } catch (error) {
        console.error("Error fetching reserved dates:", error);
      }
    };
    fetchReservedDates();
  }, []);

  // 예약된 날짜 비활성화
  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return reservedDates.some((reservedDate) => {
        return date.toDateString() === reservedDate.toDateString();
      });
    }
    return false;
  };

  // 날짜 선택 핸들러 수정
  const handleDateChange = (date) => {
    const isReserved = reservedDates.some(
      (reservedDate) => date.toDateString() === reservedDate.toDateString()
    );

    if (isReserved) {
      console.log("❌ 이미 예약된 날짜입니다:", date.toLocaleDateString());
      return;
    }

    if (selectingCheckIn) {
      setCheckIn(date);
      setSelectingCheckIn(false);
      console.log("✅ 체크인 날짜:", date.toLocaleDateString());
    } else {
      if (date <= checkIn) {
        console.log("❌ 체크아웃은 체크인 이후 날짜여야 합니다.");
        return;
      }
      setCheckOut(date);
      setSelectingCheckIn(true);
      console.log("✅ 체크아웃 날짜:", date.toLocaleDateString());
    }
  };

  // 타일 클래스 추가 (선택된 날짜 하이라이트)
  const tileClassName = ({ date }) => {
    if (checkIn && date.toDateString() === checkIn.toDateString()) {
      return "check-in-tile";
    }
    if (checkOut && date.toDateString() === checkOut.toDateString()) {
      return "check-out-tile";
    }
    if (checkIn && checkOut && date > checkIn && date < checkOut) {
      return "in-range-tile";
    }
  };

  return (
    <div>
      <h2>관광지 예약</h2>
      <div style={{ marginBottom: "20px" }}>
        <p>
          현재 {selectingCheckIn ? "체크인" : "체크아웃"} 날짜를 선택해주세요
        </p>
      </div>
      <Calendar
        tileDisabled={tileDisabled}
        onChange={handleDateChange}
        tileClassName={tileClassName}
        value={selectingCheckIn ? checkIn : checkOut}
      />
      <div style={{ marginTop: "20px" }}>
        {checkIn && <p>체크인: {checkIn.toLocaleDateString()}</p>}
        {checkOut && <p>체크아웃: {checkOut.toLocaleDateString()}</p>}
      </div>
      <MySwiper />
      <div>
        <h2>Rating Component</h2>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          step="0.1"
          min="0"
          max="5"
        />
        <Rating rating={rating} />
      </div>
    </div>
  );
};

export default CalendarComponent;

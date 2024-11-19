import Calendar from "react-calendar";

import "./StyledCalender.css";

export default function StyledCalender({
  onChange,
  minDate,
  value,
  selectRange,
}) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const lastWeekStart = new Date(lastDayOfMonth);
  lastWeekStart.setDate(lastDayOfMonth.getDate() - lastDayOfMonth.getDay());

  const nextWeekStart = new Date(lastWeekStart);
  nextWeekStart.setDate(lastWeekStart.getDate());

  const formatCalendarDay = (locale, date) => {
    const day = date.getDate();
    return day;
  };

  // 날짜가 현재 보이는 달에 속하는지 확인하는 함수
  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );

      // 현재 달의 마지막 주에서 다음 달의 날짜는 비활성화
      if (date > lastDayOfMonth || date < firstDayOfMonth) {
        return true;
      }
    }
    return false;
  };

  return (
    <Calendar
      locale="ko"
      formatDay={formatCalendarDay}
      onChange={onChange}
      minDate={minDate || new Date()}
      value={value}
      selectRange={selectRange}
      showDoubleView={true}
      showNeighboringMonth={false}
      defaultActiveStartDate={nextWeekStart}
      tileDisabled={tileDisabled}
    />
  );
}

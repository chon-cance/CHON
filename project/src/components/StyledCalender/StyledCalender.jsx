import Calendar from "react-calendar";

import "./StyledCalender.css";

export default function StyledCalender({ onChange, minDate }) {
  const formatCalendarDay = (locale, date) => {
    const day = date.getDate();
    return day;
  };

  return (
    <Calendar
      locale="ko"
      formatDay={formatCalendarDay}
      onChange={onChange}
      minDate={minDate || new Date()}
      value={null}
    />
  );
}

import Calendar from "react-calendar";

import "./StyledCalender.css";

export default function StyledCalender({
  onChange,
  minDate,
  value,
  selectRange,
  isCheckIn = false,
  selectedCheckIn = null,
  timeSlots = {},
}) {
  const today = new Date();
  today.setHours(today.getHours() + 9);
  today.setHours(0, 0, 0, 0);

  const tileDisabled = ({ date, view }) => {
    if (view !== "month") return false;

    const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const dateStr = koreaDate.toISOString().split("T")[0];

    if (isCheckIn) {
      return (
        koreaDate < today || (timeSlots[dateStr] && !timeSlots[dateStr].checkIn)
      );
    } else {
      if (!selectedCheckIn || koreaDate <= selectedCheckIn) {
        return true;
      }

      const sortedDates = Object.keys(timeSlots)
        .filter(
          (d) => new Date(d).getTime() + 9 * 60 * 60 * 1000 > selectedCheckIn
        )
        .sort();

      const firstBlockedDate = sortedDates.find((d) => !timeSlots[d].checkIn);

      if (firstBlockedDate) {
        return (
          koreaDate >=
          new Date(new Date(firstBlockedDate).getTime() + 9 * 60 * 60 * 1000)
        );
      }

      return false;
    }
  };

  const formatDay = (locale, date) => {
    const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return koreaDate.getDate();
  };

  return (
    <Calendar
      locale="ko"
      formatDay={formatDay}
      onChange={onChange}
      minDate={minDate || today}
      value={value}
      tileDisabled={tileDisabled}
    />
  );
}

export const accommodationReservation = async (accommodationId) => {
  try {
    const response = await fetch(
      `http://192.168.0.72:8080/accommodations/reservation?accommodationId=${accommodationId}`
    );
    if (!response.ok) {
      throw new Error("숙소 예약 조회 실패");
    }
    return response.json();
  } catch (error) {
    console.error("숙소 예약 조회 오류:", error);
  }
};

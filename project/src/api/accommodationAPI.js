import { apiClient } from "./apiClient";

// 유틸리티 함수들
const formatDate = (date) => {
  if (!date) return ""; // null이나 undefined일 경우 빈 문자열 반환
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kstDate.toISOString().split("T")[0];
};

const validateSearchParams = (params) => {
  if (!params.person || params.person <= 0) {
    throw new Error("인원 수를 입력해주세요.");
  }
};

// 모든 숙소 관련 API 함수들을 한 파일에 모음
export const accommodationAPI = {
  // 검색
  search: async (params) => {
    try {
      validateSearchParams(params);

      // 검색 파라미터 정제
      const searchParams = {
        region: params.region === "전체" ? "" : params.region || "",
        person: params.person?.toString() || "",
        checkIn: formatDate(params.checkIn),
        checkOut: formatDate(params.checkOut),
      };

      // URLSearchParams에서 빈 값("") 제거
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(searchParams).filter(([_, value]) => value !== "")
        )
      ).toString();

      return await apiClient.get(`/accommodations/search?${queryString}`);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      throw new Error(error.message || "검색 중 오류가 발생했습니다.");
    }
  },

  // 예약
  createReservation: (data) => {
    return apiClient.post("/reservations/create", data);
  },

  // 최신 숙소
  getRecentAccommodations: () => {
    return apiClient.get("/accommodations/top_date");
  },

  // 인기 숙소
  getTopGradeAccommodations: () => {
    return apiClient.get("/accommodations/top_grade");
  },
};

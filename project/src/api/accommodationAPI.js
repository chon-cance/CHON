import { apiClient } from "./apiClient";

// 모든 숙소 관련 API 함수들을 한 파일에 모음
export const accommodationAPI = {
  // 검색
  search: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient.get(`/accommodations/search?${queryString}`);
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

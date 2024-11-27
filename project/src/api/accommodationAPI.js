import { apiClient } from "./apiClient";

export const accommodationAPI = {
  // 검색
  search: async (queryString) => {
    try {
      return await apiClient.get(`/accommodations/search?${queryString}`);
    } catch (error) {
      throw new Error(error.message || "검색 중 오류가 발생했습니다.");
    }
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

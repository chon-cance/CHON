import { apiClient } from "./apiClient";

export const userAPI = {
  // 회원 목록 조회
  getUserList: () => {
    return apiClient.get("/users/userList");
  },

  // 로그인
  login: (data) => {
    return apiClient.post("/users/login", data);
  },

  // 회원가입
  join: (data) => {
    return apiClient.post("/users/join", data);
  },
};

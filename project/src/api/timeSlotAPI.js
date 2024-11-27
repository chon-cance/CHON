import { apiClient } from "./apiClient";

export const timeSlotAPI = {
  getAllTimeSlots: () => {
    return apiClient.get("/timeslots");
  },

  getAvailability: (date) => {
    return apiClient.get(`/timeslots/availability?date=${date}`);
  },

  getPeriodAvailability: (startDate, endDate) => {
    return apiClient.get(
      `/timeslots/period?startDate=${startDate}&endDate=${endDate}`
    );
  },

  createTimeSlot: (data) => {
    return apiClient.post("/timeSlot", data);
  },
};

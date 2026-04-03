import axiosInstance from "./axios"

export const user = {

  // получение города пользователя
  getCity: async (): Promise<{ city: string }> => {
    const response = await axiosInstance.get("client/city")
    return response.data
  },

  // отправление города пользователя
  putCity: async (data: { city: string }): Promise<{ city: string }> => {
    const response = await axiosInstance.put("client/city", data);
    return response.data
  },
}
import axiosInstance from "./axios"

export const user = {

  // получение города пользователя
  getCity: async (email: string): Promise<{ city: string }> => {
    const response = await axiosInstance.get("client/city/", {
      params: { email }
    })
    return response.data
  },

  // отправление города пользователя
  putCity: async (data: { sity: string }): Promise<{ message: string }> => {
    const response = await axiosInstance.put("client/city", data);
    return response.data
  },
}
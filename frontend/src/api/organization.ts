import axiosInstance from "./axios"
import type { Organization } from "../types/organization"

/*
  Работа с организациями.
  Создание и удаление (post, delete) только для админа.
*/

export const organization = {

  // создание организации
  post: async (data: Organization): Promise<{ message: string }> => {
    const response = await axiosInstance.post("company", data);
    return response.data
  },

  // удаление организации
  delete: async (inn: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`company/${inn}`)
    return response.data
  },

  // получение всех организаций
  getAll: async (): Promise<Organization[]> => {
    const response = await axiosInstance.get("company")
    return response.data
  },

  // получение конкретной организации
  getByINN: async (inn: string): Promise<Organization> => {
    const response = await axiosInstance.get(`company/${inn}`)
    return response.data
  },

  // получение организации пользователя
  get: async (): Promise<Organization[]> => {
    const response = await axiosInstance.get("company")
    return response.data
  },
}
import axiosInstance from "./axios"
import type { Service } from "../types/service"

/*
    Работа с услугами.
    Создание и удаление услуг (create, delete) доступно только для админов.
    Здесь имеется в виду создание целого раздела услуг, которые потом смогут выбирать организации.
    Пример: сейчас у нас на сайте есть мойка и шиномонтаж. здесь можно удалить мойку или добавить замену стёкл.

    Список всех услуг доступен для организаций. они могут выбрать как раз из того, что уже подготовил админ.
*/

export const service = {
  
  // создание новой услуги
  create: async (name: string): Promise<Service> => {
    const response = await axiosInstance.post("services", { name });
    return response.data
  },

  // удаление услуги
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`services/${id}`)
    return response.data
  },

  // список всех услуг
  getAll: async (): Promise<Service[]> => {
    const response = await axiosInstance.get("services")
    return response.data
  },
}
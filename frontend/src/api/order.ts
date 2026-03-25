import axiosInstance from "./axios"
import type { Order, UserOrder, CreateOrderRequest, CreateOrderResponse } from "../types/orders"
import type { Branch, BranchServiceDetail, FreeTimeParams, FreeTime } from "../types/branch"


// Работа с заказами
export const order = {
  
  // создание нового заказа
  post: async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    const response = await axiosInstance.post("order", data);
    return response.data
  },

  // получение списка всех заказов
  getAll: async (): Promise<Order[]> => {
    const response = await axiosInstance.get("order")
    return response.data
  },

  // Получение заказов конкретной компании
  getOrganizationOrders: async (inn: string): Promise<Order> => {
    const response = await axiosInstance.get(`company/order/${inn}`)
    return response.data
  },

  // Получение заказов конкретного пользователя
  getUserOrders: async (): Promise<UserOrder[]> => {
    const response = await axiosInstance.get("client/orders")
    return response.data
  },
}



// Предназначено для использования во время оформления заказа.
export const forOrderService = {
  // Получение списка филиалов по городу и id услуги
  getBranches: async (params: { city: string; serviceId: string }): Promise<Branch[]> => {
    const response = await axiosInstance.get("branch", { params })
    return response.data
  },

  // Получение деталей услуги филиала 
  getBranchServiceDetails: async (id: string): Promise<BranchServiceDetail[]> => {
    const response = await axiosInstance.get(`branch/service/details/${id}`)
    return response.data
  },

  // Получение свободного времени
  getFreeTime: async (params: FreeTimeParams): Promise<FreeTime[]> => {
    const response = await axiosInstance.get("branch/freetime", { params })
    return response.data
  },
}
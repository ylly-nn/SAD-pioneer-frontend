import axiosInstance from "./axios"
import type { PartnerRequest, PartnerRequestResponse, PartnerRequestStatus } from "../types/partnerRequest"

/*
  Работа с заявками на создание организации
  Создание и получение заявки (create, getByInn) доступно всем. 
  Остальное только для админов.
*/

export const organizationRequest = {

  // отправление заявки на создание компании
  create: async (data: PartnerRequest): Promise<{ message: string }> => {
    const response = await axiosInstance.post("partner/request", data)
    return response.data
  },

  // получение всех заявок на создание компании
  getAll: async (): Promise<PartnerRequestResponse[]> => {
    const response = await axiosInstance.get("admin/partner-requests")
    return response.data
  },

  // получение конкретной заявки на создание компании
  getByInn: async (inn: string): Promise<PartnerRequestResponse> => {
    const response = await axiosInstance.get(`partner/request/${inn}`)
    return response.data
  },// пупупу

  // получение заявки пользователя на создание компании
  get: async (): Promise<PartnerRequestResponse> => {
    const response = await axiosInstance.get("partner/request")
    return response.data
  },

  // Получение новых заявок
  getNew: async (): Promise<PartnerRequestResponse[]> => {
    const response = await axiosInstance.get("admin/partner-requests/new")
    return response.data
  },

  // Получение заявок в работе
  getPending: async (): Promise<PartnerRequestResponse[]> => {
    const response = await axiosInstance.get("admin/partner-requests/pending")
    return response.data
  },

  // Получение принятых заявок
  getApproved: async (): Promise<PartnerRequestResponse[]> => {
    const response = await axiosInstance.get("admin/partner-requests/approved")
    return response.data
  },

  // Получение отклоненных заявок
  getRejected: async (): Promise<PartnerRequestResponse[]> => {
    const response = await axiosInstance.get("admin/partner-requests/rejected")
    return response.data
  },
  
  // Смена статуса заявки с "новая" на "в работе"
  take: async (id: string): Promise<PartnerRequestStatus> => {
    const response = await axiosInstance.post(
      "admin/partner-requests/take",
      { id }
    )
    return response.data
  },

  // Смена статуса заявки с "в работе" на "принята" + cоздание компании и первого пользователя в ней
  approve: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.post(
      "admin/partner-requests/approve",
      { id }
    )
    return response.data
  },

  // Смена статуса заявки с "в работе" на "отклонена"
  reject: async (id: string): Promise<PartnerRequestStatus> => {
    const response = await axiosInstance.post(
      "admin/partner-requests/reject",
      { id }
    )
    return response.data
  },

}
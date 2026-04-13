import axiosInstance from "./axios"
import type { Organization, BranchRequest, BranchResponse, Branch, BranchWithServices } from "../types/organization"

/*
  Работа с организациями.
  Создание и удаление (post, delete) только для админа.
*/

// работа с организациями
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
  get: async (): Promise<Organization> => {
    const response = await axiosInstance.get("company")
    return response.data
  },
}

// работа с филиалами организации
export const branches = {

  // добавление филиала
  post: async (data: BranchRequest): Promise<BranchResponse> => {
    const response = await axiosInstance.post("company/branch", data);
    return response.data
  },

  // получение всех филиалов компании
  /*getAll: async (): Promise<Branch[] | null> => {
    const response = await axiosInstance.get("company/branches")
    return response.data
  },*/

  getAll: async (): Promise<Branch[]> => {
    const response = await axiosInstance.get("company/branches");
    return response.data;
  },

  // получение филиала по ID
  getById: async (branchId: string): Promise<BranchWithServices | null> => {
    const response = await axiosInstance.get(
      `company/branches/${branchId}`
    )
    return response.data
  },
}

// работа с пользователями организации
export const companyUsers = {

  // добавление пользователя в организацию
  add: async (email: string): Promise<{ email: string; message: string }> => {
    const response = await axiosInstance.post("company/users", { email })
    return response.data
  },
}
import axiosInstance from "./axios"
import type { CreateBranchServiceRequest, BranchService, BranchServiceDetailRequest, BranchServiceDetail } from "../types/service"

/*
  Работа с услугами для организаций.
  Здесь организации могут выбрать какие услуги будут предоставлять.
*/


export const branchService = {

  // добавление услуги для филиала
  post: async (data: CreateBranchServiceRequest): Promise<BranchService> => {
    const response = await axiosInstance.post("company/branch/service", data);
    return response.data
  },

  // добавление детали услуги филиала 
  postDetail: async (data: BranchServiceDetailRequest): Promise<BranchServiceDetail[]> => {
    const response = await axiosInstance.post("company/branch/service/detail", data);
    return response.data
  },

  // удаление детали услуги филиала 
  deleteDetail: async (branchServID: string, detail: string): Promise<BranchServiceDetail[]> => {
    const response = await axiosInstance.delete(`company/branch/service/detail/${branchServID}`,
      {
        params: { detail },
      }
    )
    return response.data
  },

  // получение деталей услуги филиала
  getDetails: async (branchServID: string): Promise<BranchServiceDetail | null> => {
    const response = await axiosInstance.get(`company/branch/service/${branchServID}`)
    return response.data
  },

}
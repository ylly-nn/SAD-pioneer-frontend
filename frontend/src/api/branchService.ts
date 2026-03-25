import axiosInstance from "./axios"
import type { CreateBranchServiceRequest, BranchService } from "../types/service"

/*
  Работа с услугами для организаций.
  Здесь организации могут выбрать какие услуги будут предоставлять.
*/

export const branchService = {

  post: async (data: CreateBranchServiceRequest): Promise<BranchService> => {
    const response = await axiosInstance.post("company/branch/service", data);
    return response.data
  },

}
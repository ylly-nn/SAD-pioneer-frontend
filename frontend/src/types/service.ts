export interface Service {
  id: string
  name: string
}

export interface BranchService {
  id: string
  branch: string
  service: string
  service_details: Record<string, number>
}

export interface CreateBranchServiceRequest {
  branch_id: string
  service_id: string
}

export type BranchServiceDetailRequest = {
  branchserv_id: string
  detail: string
  duration: number
  price: number
}

export type BranchServiceDetail = {
  detail: string
  duration_min: number
  price: number
}
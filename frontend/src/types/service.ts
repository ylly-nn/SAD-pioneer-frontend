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
  branch: string
  service: string
  service_details: Record<string, number>
}
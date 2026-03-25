export interface Branch {
  id_branchserv: string
  id_branch: string
  address: string
  org_short_name: string
}

export interface BranchServiceDetail {
  detail: string
  duration_min: number
}

export interface FreeTimeParams {
  branch_id: string
  date?: string
  duration: number
}

export interface FreeTime {
  date: string
  intervals: string[] | null
}
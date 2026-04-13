export type Organization1 = {
  id: number
  name: string
  address: string
  city: string
  coordinates: [number, number]
}

export interface Organization {
  inn: string
  kpp: string
  ogrn: string
  org_name: string
  org_short_name: string
}

export type BranchRequest = {
    address:  string;
    city:  string;
    close_time:  string;
    open_time:  string;
  }

  export type BranchResponse = {
    address:  string;
    city:  string;
    close_time:  string;
    message:  string;
    open_time:  string;
  }

  export type Branch = {
  address: string
  branch_id: string
  city: string
  close_time: string
  open_time: string
  inn_company: string
}

export type BranchWithServices = {
  address: string
  city: string
  close_time: string
  open_time: string
  services: {
    branch_serv_id: string
    service_id: string
    service_name: string
  }[]
}
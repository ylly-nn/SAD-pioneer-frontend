export interface PartnerRequest {
  inn: string
  kpp: string
  ogrn: string
  org_name: string
  org_short_name: string

  name: string
  surname: string
  patronymic: string
  email: string
  phone: string
  info: string

  created_at: string
  last_used: string
}

export interface PartnerRequestResponse extends PartnerRequest {
  id: string
  status: "new" | "pending" | "approved" | "rejected"
}

export interface PartnerRequestStatus {
  message: string
  status?: string
}
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
}

export interface PartnerRequestResponse extends PartnerRequest {
  status: "new" | "pending" | "approved" | "rejected"
}

export interface PartnerRequestStatus {
  inn: string
  //id: string
  message: string
  status: string
}
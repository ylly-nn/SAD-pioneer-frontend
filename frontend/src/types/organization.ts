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
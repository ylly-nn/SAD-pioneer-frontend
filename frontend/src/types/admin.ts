export interface PartnerRequest {
  inn: string;
  kpp: string;
  ogrn: string;
  org_name: string;
  org_short_name: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  info?: string;
  status: 'new' | 'pending' | 'approved' | 'rejected';
}

export type RequestStatus = 'all' | 'new' | 'pending' | 'approved' | 'rejected';
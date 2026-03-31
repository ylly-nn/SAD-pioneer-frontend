import api from './axios';

export interface PartnerRequest {
  reviewed_at?: string | null;
  id: string;
  status: 'new' | 'pending' | 'approved' | 'rejected';
  user_email: string;
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
  created_at: string;
  last_used: string | null;
}

// GET /admin/partner-requests/ - Получение всех заявок
export const getAllPartnerRequests = async (): Promise<PartnerRequest[]> => {
  const response = await api.get('/admin/partner-requests/');
  return response.data;
};

// GET /admin/partner-requests/new - Получение новых заявок
export const getNewPartnerRequests = async (): Promise<PartnerRequest[]> => {
  const response = await api.get('/admin/partner-requests/new');
  return response.data;
};

// GET /admin/partner-requests/pending - Получение заявок в работе
export const getPendingPartnerRequests = async (): Promise<PartnerRequest[]> => {
  const response = await api.get('/admin/partner-requests/pending');
  return response.data;
};

// GET /admin/partner-requests/approved - Получение принятых заявок
export const getApprovedPartnerRequests = async (): Promise<PartnerRequest[]> => {
  const response = await api.get('/admin/partner-requests/approved');
  return response.data;
};

// GET /admin/partner-requests/rejected - Получение отклоненных заявок
export const getRejectedPartnerRequests = async (): Promise<PartnerRequest[]> => {
  const response = await api.get('/admin/partner-requests/rejected');
  return response.data;
};

// GET /admin/partner-requests/{id} - Получение одной заявки по id
export const getPartnerRequestById = async (id: string): Promise<PartnerRequest> => {
  const response = await api.get(`/admin/partner-requests/${id}`);
  return response.data;
};

// POST /admin/partner-requests/take - Взять заявку в работу
export const takePartnerRequest = async (id: string): Promise<{ id: string; message: string; status: string }> => {
  const response = await api.post('/admin/partner-requests/take', { id });
  return response.data;
};

// POST /admin/partner-requests/approve - Одобрить заявку
export const approvePartnerRequest = async (id: string): Promise<{ message: string }> => {
  const response = await api.post('/admin/partner-requests/approve', { id });
  return response.data;
};

// POST /admin/partner-requests/reject - Отклонить заявку
export const rejectPartnerRequest = async (id: string): Promise<{ id: string; message: string; status: string }> => {
  const response = await api.post('/admin/partner-requests/reject', { id });
  return response.data;
};

// Универсальная функция для изменения статуса
export const changePartnerRequestStatus = async (id: string, newStatus: string) => {
  switch (newStatus) {
    case 'pending':
      return takePartnerRequest(id);
    case 'approved':
      return approvePartnerRequest(id);
    case 'rejected':
      return rejectPartnerRequest(id);
    default:
      throw new Error('Недопустимый статус');
  }
};

// Функция для получения заявок в зависимости от статуса (удобный wrapper)
export const getPartnerRequestsByStatus = async (status?: string): Promise<PartnerRequest[]> => {
  if (!status || status === 'all') {
    return getAllPartnerRequests();
  }
  
  switch (status) {
    case 'new':
      return getNewPartnerRequests();
    case 'pending':
      return getPendingPartnerRequests();
    case 'approved':
      return getApprovedPartnerRequests();
    case 'rejected':
      return getRejectedPartnerRequests();
    default:
      return getAllPartnerRequests();
  }
};
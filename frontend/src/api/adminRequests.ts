import api from './axios';
import type { PartnerRequest } from './admin';

export const adminRequestsApi = {
  // Получение всех заявок
  getAll: async (): Promise<PartnerRequest[]> => {
    const response = await api.get('/admin/partner-requests/');
    return response.data;
  },

  // Получение новых заявок
  getNew: async (): Promise<PartnerRequest[]> => {
    const response = await api.get('/admin/partner-requests/new');
    return response.data;
  },

  // Получение заявок в работе
  getPending: async (): Promise<PartnerRequest[]> => {
    const response = await api.get('/admin/partner-requests/pending');
    return response.data;
  },

  // Получение принятых заявок
  getApproved: async (): Promise<PartnerRequest[]> => {
    const response = await api.get('/admin/partner-requests/approved');
    return response.data;
  },

  // Получение отклоненных заявок
  getRejected: async (): Promise<PartnerRequest[]> => {
    const response = await api.get('/admin/partner-requests/rejected');
    return response.data;
  },

  // Получение одной заявки по ID
  getById: async (id: string): Promise<PartnerRequest> => {
    const response = await api.get(`/admin/partner-requests/${id}`);
    return response.data;
  },

  // Получение заявок по статусу (универсальный метод)
  getByStatus: async (status: 'new' | 'pending' | 'approved' | 'rejected' | 'all' = 'all'): Promise<PartnerRequest[]> => {
    if (status === 'all') {
      return adminRequestsApi.getAll();
    }
    switch (status) {
      case 'new':
        return adminRequestsApi.getNew();
      case 'pending':
        return adminRequestsApi.getPending();
      case 'approved':
        return adminRequestsApi.getApproved();
      case 'rejected':
        return adminRequestsApi.getRejected();
      default:
        return adminRequestsApi.getAll();
    }
  },

  // Взять заявку в работу
  takeRequest: async (id: string): Promise<{ id: string; message: string; status: string }> => {
    const response = await api.post('/admin/partner-requests/take', { id });
    return response.data;
  },

  // Одобрить заявку
  approveRequest: async (id: string): Promise<{ message: string }> => {
    const response = await api.post('/admin/partner-requests/approve', { id });
    return response.data;
  },

  // Отклонить заявку
  rejectRequest: async (id: string): Promise<{ id: string; message: string; status: string }> => {
    const response = await api.post('/admin/partner-requests/reject', { id });
    return response.data;
  },
};
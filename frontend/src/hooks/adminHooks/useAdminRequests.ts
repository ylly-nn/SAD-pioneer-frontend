import { useState, useEffect, useCallback } from 'react';
import {
  getPartnerRequestsByStatus,
  changePartnerRequestStatus,
  type PartnerRequest,
} from '../../api/admin';

export const useAdminRequests = (statusFilter: string = 'all') => {
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPartnerRequestsByStatus(statusFilter);
      setRequests(data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при загрузке заявок');
      console.error('Error loading requests:', err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]); 

  const changeRequestStatus = useCallback(async (id: string, newStatus: string) => {
    try {
      const result = await changePartnerRequestStatus(id, newStatus);
      await loadRequests(); 
      return result;
    } catch (err: any) {
      console.error('Error changing status:', err);
      throw err;
    }
  }, [loadRequests]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  return {
    requests,
    loading,
    error,
    changeRequestStatus,
    refreshRequests: loadRequests,
  };
};
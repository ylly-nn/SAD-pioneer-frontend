import { useState, useEffect, useCallback } from 'react';
import { organizationRequest } from '../../api/organizationRequest';
import type { PartnerRequestResponse } from '../../types/partnerRequest';

export const useAdminRequests = (statusFilter: string = 'all') => {
  const [requests, setRequests] = useState<PartnerRequestResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let data: PartnerRequestResponse[] | null = [];

      switch (statusFilter) {
        case 'new':
          data = await organizationRequest.getNew();
          break;
        case 'pending':
          data = await organizationRequest.getPending();
          break;
        case 'approved':
          data = await organizationRequest.getApproved();
          break;
        case 'rejected':
          data = await organizationRequest.getRejected();
          break;
        default:
          data = await organizationRequest.getAll();
      }

      setRequests(data || []);
    } catch (err: any) {
      console.error(err);
      setError('Ошибка при загрузке заявок');
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  const changeRequestStatus = useCallback(
    async (
  id: string,
  newStatus: "new" | "pending" | "approved" | "rejected"
) => {
      try {
        if (newStatus === 'pending') {
          await organizationRequest.take(id);
        } else if (newStatus === 'approved') {
          await organizationRequest.approve(id);
        } else if (newStatus === 'rejected') {
          await organizationRequest.reject(id);
        }

        setRequests((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, status: newStatus } : r
          )
        );
      } catch (err) {
        console.error('Error changing status:', err);
        throw err;
      }
    },
    []
  );

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
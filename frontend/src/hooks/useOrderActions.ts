import { useState } from "react";
import { order as orderApi } from "../api/order";

export const useOrderActions = (
  updateLocal: (id: string, status: string) => void
) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (
    orderId: string,
    currentStatus: string,
    newStatus: "approve" | "reject"
  ) => {
    setError(null);

    if (currentStatus === newStatus) return;

    updateLocal(orderId, newStatus);

    try {
      setLoadingId(orderId);

      await orderApi.updateStatus(orderId, newStatus);
    } catch (e: any) {
      updateLocal(orderId, currentStatus);
      setError(e?.message || "Ошибка обновления статуса");
    } finally {
      setLoadingId(null);
    }
  };

  const approve = (id: string, status: string) =>
    updateStatus(id, status, "approve");

  const reject = (id: string, status: string) =>
    updateStatus(id, status, "reject");

  return {
    approve,
    reject,
    loadingId,
    error,
  };
};
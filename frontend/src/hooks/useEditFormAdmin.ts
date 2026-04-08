import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { organizationRequest } from "../api/organizationRequest";

type OrderStatus = "new" | "pending" | "approved" | "rejected";

export const useEditFormAdmin = () => {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState<OrderStatus>("new");
  const [reviewedAt, setReviewedAt] = useState<string | null>(null);

  useEffect(() => {
    const loadFormData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await organizationRequest.getAll();
        const current = data.find((r) => r.id === id);

        setFormData(current);
        setStatus(current?.status || "new");
        setReviewedAt(current?.last_used || null);
      } catch (error) {
        console.error("Ошибка загрузки заявки:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFormData();
  }, [id]);

  const handleAction = async (newStatus: OrderStatus) => {
    if (!id) return;

    try {
      setStatus(newStatus);

      if (newStatus === "pending") {
        await organizationRequest.take(id);
      } else if (newStatus === "approved") {
        await organizationRequest.approve(id);
      } else if (newStatus === "rejected") {
        await organizationRequest.reject(id);
      }

      if (
        (newStatus === "approved" || newStatus === "rejected") &&
        !reviewedAt
      ) {
        setReviewedAt(new Date().toISOString());
      }
    } catch (e) {
      console.error(e);
      alert("Ошибка при изменении статуса");
    }
  };

  return {
    formData,
    loading,
    status,
    reviewedAt,
    handleAction,
  };
};
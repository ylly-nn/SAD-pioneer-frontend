import { useState, useEffect } from "react";
import { getPartnerRequestById, changePartnerRequestStatus } from "../api/admin";
import { useParams } from "react-router-dom";

export const useEditFormAdmin = () => {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("new");

  const [reviewedAt, setReviewedAt] = useState<string | null>(null);

  useEffect(() => {
    const loadFormData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data = await getPartnerRequestById(id);

        setFormData(data);

        setStatus(data.status);

        setReviewedAt(data.last_used || null);

      } catch (error) {
        console.error("Ошибка загрузки заявки:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFormData();
  }, [id]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);

    if (
      (newStatus === "approved" || newStatus === "rejected") &&
      !reviewedAt
    ) {
      setReviewedAt(new Date().toISOString());
    }
  };

  const handleSubmit = async () => {
    if (!formData || !id) return;

    try {

      await changePartnerRequestStatus(id, status);

      console.log("Статус обновлен:", status);

      alert("Сохранено");

    } catch (e) {
      console.error(e);
      alert("Ошибка при сохранении");
    }
  };

  return {
    formData,
    loading,
    status,
    reviewedAt,
    handleStatusChange,
    handleSubmit
  };
};
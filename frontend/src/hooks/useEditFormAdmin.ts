import { useState, useEffect } from "react";
import { getPartnerRequestById } from "../api/admin";
import { useParams } from "react-router-dom";

// Маппинг статусов
const statusToRussian: Record<string, string> = {
  new: "новая",
  pending: "в работе",
  approved: "одобрена",
  rejected: "отклонена"
};

const statusToEnglish: Record<string, string> = {
  "новая": "new",
  "в работе": "pending",
  "одобрена": "approved",
  "отклонена": "rejected"
};

export const useEditFormAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("новая");
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
        
        // Преобразуем статус из API в русский
        const russianStatus = statusToRussian[data.status] || "новая";
        setStatus(russianStatus);
        
        // Устанавливаем дату рассмотрения, если есть
        setReviewedAt(data.reviewed_at || null);
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
      (newStatus === "одобрена" || newStatus === "отклонена") &&
      !reviewedAt
    ) {
      setReviewedAt(new Date().toISOString());
    }
  };

  const handleSubmit = async () => {
    if (!formData) return;
    
    // Преобразуем статус обратно в английский для API
    const payload = {
      ...formData,
      status: statusToEnglish[status],
      reviewed_at: reviewedAt
    };

    try {
      console.log("Отправка:", payload);
      
      // TODO: Раскомментировать, когда API будет готов
      // await api.updateApplication(payload)
      
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
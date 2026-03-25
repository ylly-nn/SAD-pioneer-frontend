import { useState } from "react";

export const useEditFormAdmin = (initialData: any) => {
  const [status, setStatus] = useState(
    initialData?.status || "новая"
  );

  const [reviewedAt, setReviewedAt] = useState(
    initialData?.reviewed_at || null
  );

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);

    if (
      (newStatus === "исполнена" || newStatus === "отклонена") &&
      !reviewedAt
    ) {
      setReviewedAt(new Date().toISOString());
    }
  };

  const handleSubmit = async () => {
    const payload = {
      ...initialData,
      status,
      reviewed_at: reviewedAt
    };

    try {
      console.log("Отправка:", payload);

      // await api.updateApplication(payload)

      alert("Сохранено");
    } catch (e) {
      console.error(e);
    }
  };

  return {
    status,
    reviewedAt,
    handleStatusChange,
    handleSubmit
  };
};
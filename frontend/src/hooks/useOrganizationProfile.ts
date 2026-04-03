import { useState, useEffect } from "react";
import { organizationRequest } from "../api/organizationRequest";
import { type PartnerRequestResponse } from "../types/partnerRequest";

export const useProfile = () => {

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialFormData: PartnerRequestResponse = {
    id: "",
    status: "new",
    inn: "",
    kpp: "",
    ogrn: "",
    org_name: "",
    org_short_name: "",
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    phone: "",
    info: "",

    created_at: "",
    last_used: ""
  };

  const [formData, setFormData] =
    useState<PartnerRequestResponse>(initialFormData);

  const loadForm = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await organizationRequest.get();

      setFormData({
        ...initialFormData,
        ...response,
      });
    } catch (err: any) {
      const message = err.response?.data?.message || "Ошибка загрузки данных";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadForm();
  }, []);

  const currentStatusKey = formData.status;

  const statusMap = {
    new: {
      icon: "⏱︎",
      title: "Заявка получена",
      text: (name: string) =>
        `Спасибо за то, что оставили заявку.\nОрганизация "${name}" ожидает рассмотрения администратором.`,
      badge: "Новая",
    },
    pending: {
      icon: "✴︎",
      title: "Заявка в работе",
      text: (name: string) =>
        `Спасибо за то, что оставили заявку.\nМы рассматриваем организацию "${name}".`,
      badge: "В в работе",
    },
    approved: {
      icon: "✓",
      title: "Заявка одобрена",
      text: (name: string) =>
        `Ваша заявка была одобрена.\nОрганизация "${name}" теперь активна.`,
      badge: "Одобрено",
    },
    rejected: {
      icon: "✗",
      title: "Заявка отклонена",
      text: (name: string) =>
        `Ваша заявка была отклонена.\nПо заявке "${name}" было отправлено письмо с объяснением причины.`,
      badge: "Отклонено",
    },
  };

  const currentStatus = statusMap[formData.status];

  return {
    name: formData.name,
    status: formData.status,
    currentStatus,
    error,
    isLoading,
    reload: loadForm,
    currentStatusKey
  };
};
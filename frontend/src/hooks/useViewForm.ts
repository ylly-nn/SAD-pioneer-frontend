import { useState, useEffect } from "react";
import { organizationRequest } from "../api/organizationRequest";
import { type PartnerRequestResponse } from "../types/partnerRequest";
import { useNavigation } from "./useNavigation";

export const useViewForm = () => {
  const { goBack } = useNavigation();

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

      if (err.response?.status === 404) {
        goBack();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadForm();
  }, []);

  return {
    formData,
    error,
    isLoading,
  };
};

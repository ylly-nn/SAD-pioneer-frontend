import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { organizationRequest } from "../api/organizationRequest";
import { type PartnerRequest } from "../types/partnerRequest"

export const useEditForm = () => {
  const [formData, setFormData] = useState<PartnerRequest>({
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

    info: ""
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      setError("Необходимо принять условия политики");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      console.log("Отправка формы:", formData);
      
      // ОТПРАВЛЯЕМ ДАННЫЕ НА СЕРВЕР
      const response = await organizationRequest.create(formData);

      //console.log("представим, что отправились...")
      
      console.log("Ответ от сервера:", response);
      
      // ТОЛЬКО после успешной отправки переходим на страницу просмотра
      navigate(ROUTES.ORGANIZATION.VIEW_FORM, {
        state: { 
          email: formData.email,
          message: "Данные успешно отправлены!" 
        }
      });

    } catch (err: any) {
      console.error("Ошибка при отправке:", err);
      setError(err.response?.data?.message || err.message || "Ошибка отправки");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
  formData.org_name.trim() !== "" &&
  formData.org_short_name.trim() !== "" &&
  formData.inn.trim() !== "" &&
  formData.kpp.trim() !== "" &&
  formData.ogrn.trim() !== "" &&
  formData.surname.trim() !== "" &&
  formData.name.trim() !== "" &&
  formData.patronymic.trim() !== "" &&
  formData.email.trim() !== "" &&
  formData.phone.trim() !== "" &&
  termsAccepted;

  return {
    formData,
    termsAccepted,
    error,
    isLoading,
    handleChange,
    handleTermsChange,
    handleSubmit,
    isFormValid
  };
};
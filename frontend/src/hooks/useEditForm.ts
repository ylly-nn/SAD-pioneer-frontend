import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

type EditFormData = {
  inn: string;
  kpp: string;
  ogrn: string;
  org_name: string;
  org_short_name: string;

  name: string;
  surname: string;
  middle_name: string;
  email: string;
  phone_number: string;

  info: string;
};

export const useEditForm = () => {
  const [formData, setFormData] = useState<EditFormData>({
    inn: "",
    kpp: "",
    ogrn: "",
    org_name: "",
    org_short_name: "",

    name: "",
    surname: "",
    middle_name: "",
    email: "",
    phone_number: "",

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

      navigate(ROUTES.ORGANIZATION.VIEW_FORM, {
        state: { email: formData.email }
      });

    } catch (err: any) {
      setError(err?.response?.data?.message || "Ошибка отправки");
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
  formData.middle_name.trim() !== "" &&
  formData.email.trim() !== "" &&
  formData.phone_number.trim() !== "" &&
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
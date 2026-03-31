import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { organizationRequest } from "../api/organizationRequest";
import { type PartnerRequest } from "../types/partnerRequest";

const validateOrgName = (value: string): string => {
  if (!value) return "Название организации обязательно";
  if (value.length < 3 || value.length > 100) return "Название организации должно быть от 3 до 100 символов";
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  if (!regex.test(value)) return "Допустимы только буквы (рус/лат), дефис и пробел";
  return "";
};

const validateShortOrgName = (value: string): string => {
  if (!value) return "Краткое название организации обязательно";
  if (value.length < 3 || value.length > 50) return "Краткое название должно быть от 3 до 50 символов";
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  if (!regex.test(value)) return "Допустимы только буквы (рус/лат), дефис и пробел";
  return "";
};

const validateINN = (value: string): string => {
  if (!value) return "ИНН обязателен";
  const regex = /^\d+$/;
  if (!regex.test(value)) return "ИНН должен содержать только цифры";
  if (value.length !== 10 && value.length !== 12) return "ИНН должен быть 10 или 12 символов";
  return "";
};

const validateKPP = (value: string): string => {
  if (!value) return "КПП обязателен";
  const regex = /^\d+$/;
  if (!regex.test(value)) return "КПП должен содержать только цифры";
  if (value.length !== 9) return "КПП должен быть ровно 9 символов";
  return "";
};

const validateOGRN = (value: string): string => {
  if (!value) return "ОГРН обязателен";
  const regex = /^\d+$/;
  if (!regex.test(value)) return "ОГРН должен содержать только цифры";
  if (value.length !== 13) return "ОГРН должен быть ровно 13 символов";
  return "";
};

const validateSurname = (value: string): string => {
  if (!value) return "Фамилия обязательна";
  if (value.length < 2 || value.length > 100) return "Фамилия должна быть от 2 до 100 символов";
  const regex = /^[а-яА-ЯёЁ\s-]+$/;
  if (!regex.test(value)) return "Фамилия может содержать только кириллицу, дефис и пробел";
  return "";
};

const validateName = (value: string): string => {
  if (!value) return "Имя обязательно";
  if (value.length < 2 || value.length > 100) return "Имя должно быть от 2 до 100 символов";
  const regex = /^[а-яА-ЯёЁ\s-]+$/;
  if (!regex.test(value)) return "Имя может содержать только кириллицу, дефис и пробел";
  return "";
};

const validatePatronymic = (value: string): string => {
  if (value && value.length > 100) return "Отчество не должно превышать 100 символов";
  if (value && !/^[а-яА-ЯёЁ\s-]*$/.test(value)) return "Отчество может содержать только кириллицу, дефис и пробел";
  return "";
};

const validateEmail = (value: string): string => {
  if (!value) return "Email обязателен";
  if (value.length < 6 || value.length > 64) return "Email должен быть от 6 до 64 символов";
  if (/\s/.test(value)) return "Email не должен содержать пробелов";
  
  const atIndex = value.indexOf("@");
  if (atIndex === -1) return 'Email должен содержать "@"';
  if (atIndex !== value.lastIndexOf("@")) return 'Символ "@" не может повторяться';
  if (atIndex === 0) return 'Локальная часть email не может быть пустой';
  
  const localPart = value.slice(0, atIndex);
  const domainPart = value.slice(atIndex + 1);
  
  const localRegex = /^[a-zA-Z0-9.-]+$/;
  if (!localRegex.test(localPart)) return "Локальная часть может содержать только латиницу, цифры, тире и точку";
  if (localPart.startsWith('.') || localPart.endsWith('.')) return "Локальная часть не может начинаться или заканчиваться точкой";
  if (localPart.includes('..')) return "Локальная часть не может содержать две точки подряд";
  
  if (!domainPart) return "Домен не может быть пустым";
  if (domainPart.startsWith('.')) return "Домен не может начинаться с точки";
  if (domainPart.endsWith('.')) return "Домен не может заканчиваться точкой";
  if (domainPart.includes('..')) return "Домен не может содержать две точки подряд";
  
  const domainRegex = /^[a-zA-Z0-9.-]+$/;
  if (!domainRegex.test(domainPart)) return "Домен может содержать только латиницу, цифры, тире и точку";
  
  return "";
};

const validatePhone = (value: string): string => {
  if (!value) return "Телефон обязателен";
  const regex = /^\d+$/;
  if (!regex.test(value)) return "Телефон должен содержать только цифры";
  if (value.length !== 10) return "Телефон должен быть ровно 10 символов (без +7, 7, 8)";
  return "";
};

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "org_name": return validateOrgName(value);
      case "org_short_name": return validateShortOrgName(value);
      case "inn": return validateINN(value);
      case "kpp": return validateKPP(value);
      case "ogrn": return validateOGRN(value);
      case "surname": return validateSurname(value);
      case "name": return validateName(value);
      case "patronymic": return validatePatronymic(value);
      case "email": return validateEmail(value);
      case "phone": return validatePhone(value);
      default: return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const fieldError = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
    if (e.target.checked && error === "Необходимо принять условия политики") {
      setError(null);
    }
  };

  const validateAllFields = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    newErrors.org_name = validateOrgName(formData.org_name);
    newErrors.org_short_name = validateShortOrgName(formData.org_short_name);
    newErrors.inn = validateINN(formData.inn);
    newErrors.kpp = validateKPP(formData.kpp);
    newErrors.ogrn = validateOGRN(formData.ogrn);
    newErrors.surname = validateSurname(formData.surname);
    newErrors.name = validateName(formData.name);
    newErrors.patronymic = validatePatronymic(formData.patronymic);
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);
    
    setFieldErrors(newErrors);
    
    return Object.values(newErrors).every(err => err === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields()) {
      setError("Пожалуйста, исправьте ошибки в форме");
      return;
    }

    if (!termsAccepted) {
      setError("Необходимо принять условия политики");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      console.log("Отправка формы:", formData);
      
      const response = await organizationRequest.create(formData);
      
      console.log("Ответ от сервера:", response);
      
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
    termsAccepted &&
    Object.values(fieldErrors).every(err => err === "");

  return {
    formData,
    termsAccepted,
    error,
    isLoading,
    handleChange,
    handleTermsChange,
    handleSubmit,
    isFormValid,
    fieldErrors
  };
};
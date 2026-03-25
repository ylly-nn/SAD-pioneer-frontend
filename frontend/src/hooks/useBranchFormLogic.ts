import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

type FormData = {
  city: string;
  address: string;
  openning_time: string;
  closing_time: string;
};

export const useBranchForm = () => {
  const [formData, setFormData] = useState<FormData>({
    city: "",
    address: "",
    openning_time: "",
    closing_time: "",
  });

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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setIsLoading(true);

    try {
      console.log("Отправка формы:", formData);
      
      // ОТПРАВЛЯЕМ ДАННЫЕ НА СЕРВЕР
      console.log("представим, что отправились...")
      
      
      // ТОЛЬКО после успешной отправки переходим на страницу просмотра
      navigate(ROUTES.ORGANIZATION.VIEW_FORM, {
        state: {
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
    formData.city.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.openning_time.trim() !== "" &&
    formData.closing_time.trim() !== ""

  return {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    isFormValid
  };
};
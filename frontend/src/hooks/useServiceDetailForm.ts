import { useState, useEffect } from "react";
import { branchService } from "../api/branchService";
import { useNavigation } from "./useNavigation";
import { useParams } from "react-router-dom";

import {
  validateServiceForm,
  type ServiceErrors,
} from "../utils/serviceDetailValidation";

export const useServiceDetailForm = () => {
  const { goBack } = useNavigation();
  const { serviceId } = useParams<{ serviceId: string }>();

  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<ServiceErrors>({});
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };


  useEffect(() => {
    const validationErrors = validateServiceForm(form);

    const filtered: ServiceErrors = {};

    Object.keys(validationErrors).forEach((key) => {
      if (touched[key]) {
        filtered[key as keyof ServiceErrors] =
          validationErrors[key as keyof ServiceErrors];
      }
    });

    setErrors(filtered);
  }, [form, touched]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateServiceForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!serviceId) return;

    setIsLoading(true);

    try {
      await branchService.postDetail({
        branchserv_id: serviceId,
        detail: form.name.trim(),
        duration: Number(form.duration),
        price: Number(form.price),
      });

      goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    form.name &&
    form.duration &&
    form.price &&
    Object.keys(errors).length === 0;

  return {
    form,
    errors,
    touched,
    isLoading,
    isFormValid,
    handleChange,
    handleSubmit,
  };
};
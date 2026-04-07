// hooks/useBranchForm.ts

import { useState, useEffect } from "react";
import { branches as branchesApi } from "../api/organization";
import { useNavigation } from "./useNavigation";
import type { BranchRequest } from "../types/organization";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import tzLookup from "tz-lookup";

import {
  validateBranchForm,
  type FormErrors,
} from "../utils/branchValidation";

dayjs.extend(utc);
dayjs.extend(timezone);

type FormData = {
  city: string;
  address: string;
  openning_time: string;
  closing_time: string;
};

type Touched = {
  [key: string]: boolean;
};

export const useBranchForm = (ymaps: any) => {
  const { goToOrganizationBranches } = useNavigation();

  const [formData, setFormData] = useState<FormData>({
    city: "",
    address: "",
    openning_time: "",
    closing_time: "",
  });

  const [touched, setTouched] = useState<Touched>({});

  const [syncErrors, setSyncErrors] = useState<FormErrors>({});
  const [asyncErrors, setAsyncErrors] = useState<FormErrors>({});

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ---------------- CHANGE ----------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // ---------------- SYNC VALIDATION ----------------

  useEffect(() => {
    const errors = validateBranchForm(formData);
    setSyncErrors(errors);
  }, [formData]);

  // ---------------- ASYNC CITY ----------------

  useEffect(() => {
    if (!formData.city || syncErrors.city) return;

    const t = setTimeout(async () => {
      try {
        const res = await ymaps.geocode(formData.city);
        const obj = res.geoObjects.get(0);

        setAsyncErrors((prev) => ({
          ...prev,
          city: obj ? undefined : "Город не найден",
        }));
      } catch {
        setAsyncErrors((prev) => ({
          ...prev,
          city: "Ошибка проверки города",
        }));
      }
    }, 500);

    return () => clearTimeout(t);
  }, [formData.city, syncErrors.city]);

  // ---------------- ASYNC ADDRESS ----------------

  useEffect(() => {
    if (!formData.address || syncErrors.address || !formData.city) return;

    const t = setTimeout(async () => {
      try {
        const res = await ymaps.geocode(
          `${formData.city}, ${formData.address}`,
          { results: 1 }
        );

        const obj = res.geoObjects.get(0);

        setAsyncErrors((prev) => ({
          ...prev,
          address: obj ? undefined : "Адрес не найден",
        }));
      } catch {
        setAsyncErrors((prev) => ({
          ...prev,
          address: "Ошибка проверки адреса",
        }));
      }
    }, 700);

    return () => clearTimeout(t);
  }, [formData.address, formData.city, syncErrors.address]);

  // ---------------- MERGE ERRORS ----------------

  const errors: FormErrors = {
    ...syncErrors,
    ...asyncErrors,
  };

  // ---------------- SUBMIT ----------------

  const formatTime = (time: string, timezone: string) => {
    return dayjs.tz(`2024-01-01 ${time}`, timezone).format("HH:mm:ssZ");
  };

  const mapToRequest = async (): Promise<BranchRequest> => {
    const res = await ymaps.geocode(formData.city);
    const coords = res.geoObjects.get(0).geometry.getCoordinates();

    const timezone = tzLookup(coords[0], coords[1]);

    return {
      city: formData.city,
      address: formData.address,
      open_time: formatTime(formData.openning_time, timezone),
      close_time: formatTime(formData.closing_time, timezone),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    setIsLoading(true);

    try {
      const payload = await mapToRequest();
      await branchesApi.post(payload);

      goToOrganizationBranches();
    } catch (err: any) {
      setError(err.message || "Ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.city &&
    formData.address &&
    formData.openning_time &&
    formData.closing_time &&
    !Object.values(errors).some(Boolean);

  return {
    formData,
    errors,
    touched,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    isFormValid,
  };
};
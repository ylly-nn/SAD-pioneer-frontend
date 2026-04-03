import { useState } from "react";
import { branches as branchesApi } from "../api/organization";
import { useNavigation } from "./useNavigation";
import type { BranchRequest } from "../types/organization";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import tzLookup from "tz-lookup";

dayjs.extend(utc);
dayjs.extend(timezone);

type FormData = {
  city: string;
  address: string;
  openning_time: string;
  closing_time: string;
};

export const useBranchForm = (ymaps: any) => {
  const { goToOrganizationBranches } = useNavigation();

  const [formData, setFormData] = useState<FormData>({
    city: "",
    address: "",
    openning_time: "",
    closing_time: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getTimezoneByCity = async (city: string) => {
    if (!ymaps) {
      throw new Error("ymaps не готов");
    }

    const res = await ymaps.geocode(city);

    const firstGeoObject = res.geoObjects.get(0);

    if (!firstGeoObject) {
      throw new Error("Город не найден");
    }

    const coords = firstGeoObject.geometry.getCoordinates();

    const timezone = tzLookup(coords[0], coords[1]);

    return timezone;
  };

  const formatTime = (time: string, timezone: string) => {

    const date = dayjs.tz(`2024-01-01 ${time}`, timezone);

    const formatted = date.format("HH:mm:ssZ");

    return formatted;
  };

  const mapToRequest = async (): Promise<BranchRequest> => {
    const timezone = await getTimezoneByCity(formData.city);

    const payload = {
      city: formData.city,
      address: formData.address,
      open_time: formatTime(formData.openning_time, timezone),
      close_time: formatTime(formData.closing_time, timezone),
    };

    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setIsLoading(true);

    try {
      const payload = await mapToRequest();
      await branchesApi.post(payload);

      goToOrganizationBranches();
    } catch (err: any) {
      console.error("error:", err);

      setError(err.message || "Ошибка отправки");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.city &&
    formData.address &&
    formData.openning_time &&
    formData.closing_time;

  return {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    isFormValid,
  };
};
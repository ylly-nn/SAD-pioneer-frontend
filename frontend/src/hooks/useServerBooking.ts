import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import type { BookingDraft } from "../types/booking";

export const useBooking = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");

  const saveDraft = (data: Partial<BookingDraft>) => {
    const current = JSON.parse(localStorage.getItem("bookingDraft") || "{}");
    localStorage.setItem("bookingDraft", JSON.stringify({ ...current, ...data }));
  };

  const handleSelectDetails = (data: BookingDraft) => {
    saveDraft(data);
    navigate(ROUTES.USER.SERVICE.DETAILS);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedService(e.target.value);
  };

  const handleSubmitService = () => {
    saveDraft({ service: selectedService });
    navigate(ROUTES.USER.SERVICE.ORGANIZATION);
  };

  return {
    selectedService,
    handleServiceChange,
    handleSubmitService,
    handleSelectDetails,
    saveDraft,
  };
};
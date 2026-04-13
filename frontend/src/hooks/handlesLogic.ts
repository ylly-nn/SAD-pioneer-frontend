import type { BookingDraft } from "../types/booking";

import type { ChangeEvent } from 'react';

import { ROUTES } from "../constants/routes";

import { useNavigate } from "react-router-dom";

export const useHandlesLogic = () => {

  const navigate = useNavigate();

  // обработчики навигации

  // общие
  const handleHome = () => navigate("/");

  // для владельцев автомобилей
  // /user/ будет вести на профиль пользователя думаю. сейчас такого функционала нет, но в будущем плнируется


  const handleSelectService = () => navigate(ROUTES.USER.SERVICE.SELECT);
  const handleSelectOrganization = () => navigate(ROUTES.USER.SERVICE.ORGANIZATION);
  //const handleSelectDetails = () => navigate(ROUTES.USER.SERVICE.DETAILS);
  const handleSelectTime = () => navigate(ROUTES.USER.SERVICE.TIME);
  const handleConfirmBooking = () => navigate(ROUTES.USER.SERVICE.CONFIRM);



  const handleSelectDetails = (data: BookingDraft) => {
    console.log("Черновик записи:", data);

    const currentDraft = JSON.parse(
      localStorage.getItem("bookingDraft") || "{}"
    );

    const updatedDraft = {
      ...currentDraft,
      ...data,
    };

    localStorage.setItem("bookingDraft", JSON.stringify(updatedDraft));

    navigate(ROUTES.USER.SERVICE.DETAILS);
  };


  const handleServiceChange = (setSelectedService: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedService(e.target.value);
  };

  const handleSubmitService = (selectedService: string) => {
    console.log('Выбрана услуга:', selectedService);
    navigate(ROUTES.USER.SERVICE.ORGANIZATION);
};



  return {
    handleHome,
    handleSelectService,
    handleSelectOrganization,
    handleSelectDetails,
    handleSelectTime,
    handleConfirmBooking,

    handleServiceChange,
    handleSubmitService,
  };
};

import { useState } from "react";

export const useModal = () => {
const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(prev => !prev);
  };
  const closeModal = () => setModalOpen(false);

  return {
    isModalOpen,
    toggleModal,
    closeModal,
  };
}
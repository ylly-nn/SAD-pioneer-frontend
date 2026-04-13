import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "../components/provider/ToastProvider";

type ToastState = {
  toast?: {
    message: string;
    type?: "success" | "error" | "info";
  };
};

export const usePageToast = () => {
  const location = useLocation();
  const { addToast } = useToast();

  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;

    const state = location.state as ToastState;

    if (state?.toast?.message) {
      addToast(state.toast.message, state.toast.type);

      handledRef.current = true;

      window.history.replaceState({}, document.title);
    }
  }, [location]);
};
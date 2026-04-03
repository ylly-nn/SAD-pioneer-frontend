import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useUserProfile } from "./useUserProfile";
import { type UserOrder, type OrderDetail } from "../types/orders";

export const useUserOrderDetails = () => {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();

  const {
    currentOrders,
    pastOrders,
    isLoading,
  } = useUserProfile();

  const allOrders = [...currentOrders, ...pastOrders];

  // 1. сначала из состояния
  let order: UserOrder | undefined = state?.order;

  //  2. потом с бека
  if (!order && id) {
    order = allOrders.find((o) => o.order_id === id);
  }

  // формат даты
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

  // диапазон времени
  const getTimeRange = () => {
    if (!order) return "";
    return `${formatTime(order.start_moment)} - ${formatTime(
      order.end_moment
    )}`;
  };

  // общее время
  const totalDuration = useMemo(() => {
    if (!order) return 0;

    const start = new Date(order.start_moment).getTime();
    const end = new Date(order.end_moment).getTime();

    return Math.round((end - start) / 60000);
  }, [order]);

  const details = useMemo(() => {
    if (!order) return [];

    return order.order_details.map((item: OrderDetail) => ({
      name: item.detail,
      time: item.duration_min,
      price: item.price,
    }));
  }, [order]);

  const totalPrice = order ? order.sum : "—";

  return {
    order,
    isLoading,

    formatDate,
    formatTime,
    getTimeRange,

    details,
    totalDuration,
    totalPrice,
  };
};
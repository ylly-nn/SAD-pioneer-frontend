import { useState, useEffect, useMemo } from "react";
import { order } from "../api/order";
import { type UserOrder } from "../types/orders";

export const useUserProfile = () => {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await order.getUserOrders();
      setOrders(response || []);
    } catch (err: any) {
      const message = err.response?.data?.message || "Ошибка загрузки данных";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);


  // разделение заказов на текущие и прошлые
  const { currentOrders, pastOrders } = useMemo(() => {
    const now = new Date();

    const current: UserOrder[] = [];
    const past: UserOrder[] = [];

    orders.forEach((order) => {
      const endDate = new Date(order.end_moment);

      if (endDate >= now) {
        current.push(order);
      } else {
        past.push(order);
      }
    });

    return {
      currentOrders: current,
      pastOrders: past,
    };
  }, [orders]);

  // формат даты
  const formatDate = (date: string) =>
    new Date(date).toLocaleString("ru-RU", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });

  return {
    currentOrders,
    pastOrders,
    isLoading,
    error,
    formatDate,
    reload: loadOrders,
  };
};

 
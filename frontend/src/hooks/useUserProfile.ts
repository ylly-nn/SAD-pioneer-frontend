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


  /*
    // данные для проверки UI
  const currentOrders: UserOrder[] = [
    {
    order_id: "1",
    name_company: "ООО \"Ромашка\"",
    city: "Москва",
    address: "ул. Тверская, д. 1",
    service: "СЕЙЧАС 1 Шиномонтаж",
    start_moment: "2026-03-16T09:30:00+04:00",
    end_moment: "2026-03-16T11:05:00+04:00",
    order_details: {
        "Шлифовка": 20,
        "Полировка": 75
    }
  },
  {
    order_id: "2",
    name_company: "ООО \"Ромашка\"",
    city: "Москва",
    address: "ул. Тверская, д. 1",
    service: "СЕЙЧАС 2 Шиномонтаж",
    start_moment: "2026-03-16T09:30:00+04:00",
    end_moment: "2026-03-16T11:05:00+04:00",
    order_details: {
        "Шлифовка": 20,
        "Полировка": 75
    }
  },
  {
    order_id: "3",
    name_company: "ООО \"Ромашка\"",
    city: "Москва",
    address: "ул. Тверская, д. 1",
    service: "СЕЙЧАС 3 Шиномонтаж",
    start_moment: "2026-03-16T09:30:00+04:00",
    end_moment: "2026-03-16T11:05:00+04:00",
    order_details: {
        "Шлифовка": 20,
        "Полировка": 75
    }
  },
  
  ];
  

  const pastOrders: UserOrder[] = [
    {
    order_id: "3",
    name_company: "ООО \"Ромашка\"",
    city: "Москва",
    address: "ул. Тверская, д. 1",
    service: "ПРОШЛОЕ Шиномонтаж",
    start_moment: "2026-03-16T09:30:00+04:00",
    end_moment: "2026-03-16T11:05:00+04:00",
    order_details: {
        "Шлифовка": 20,
        "Полировка": 75
    }
  },
  ];*/

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

 
import { useState, useEffect, useMemo } from "react";
import { order } from "../api/order";
import type { CompanyOrders } from "../types/orders";

export const useOrganizationOrder = () => {
    
  const [rawData, setRawData] = useState<CompanyOrders[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateOrderStatusLocal = (orderId: string, newStatus: string) => {
  setRawData((prev) =>
    prev.map((branch: any) => ({
      ...branch,
      orders: (branch.orders ?? branch.Orders ?? []).map((o: any) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      ),
    }))
  );
};

  const loadOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await order.getOrganizationOrders();
      setRawData(res || []);
    } catch (err: any) {
      const message =
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.message || "Ошибка загрузки";

      setError(message);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const orders = useMemo(() => {
    return rawData.flatMap((branch: any) => {
      const branchOrders = branch.orders ?? branch.Orders ?? [];

      return branchOrders.map((o: any) => ({
        id: o.id,
        order_id: o.id,
        user: o.users,

        branch_id: branch.branch_id,
        branch_name: "Филиал",
        branch_city: branch.city,
        branch_address: branch.address,

        service: o.name_service,
        details:
          o.order_details?.map((d: any) => d.detail).join(", ") || "",

        start_time: o.start_moment,
        end_time: o.end_moment,

        status: o.status,

        total_amount: o.sum,
        created_at: o.start_moment,
      }));
    });
  }, [rawData]);

  const { currentOrders, pastOrders } = useMemo(() => {
    const now = new Date();

    const current: typeof orders = [];
    const past: typeof orders = [];

    orders.forEach((o) => {
      const end = new Date(o.end_time);

      if (!isNaN(end.getTime()) && end >= now) {
        current.push(o);
      } else {
        past.push(o);
      }
    });

    return { currentOrders: current, pastOrders: past };
  }, [orders]);

  return {
    currentOrders,
    pastOrders,
    isLoading,
    error,
    reload: loadOrders,
    updateOrderStatusLocal,
  };
};
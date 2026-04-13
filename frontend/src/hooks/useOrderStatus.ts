export type OrderStatus =
  | "create"
  | "approve"
  | "reject"
  | "new"
  | "pending"
  | "approved"
  | "rejected";

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; bg: string }
> = {
  create: {
    label: "Новый",
    color: "#f59e0b",
    bg: "#fef3c7",
  },
  approve: {
    label: "Подтверждён",
    color: "#10b981",
    bg: "#d1fae5",
  },
  reject: {
    label: "Отклонён",
    color: "#ef4444",
    bg: "#fee2e2",
  },

  new: {
    label: "Новая",
    color: "#3b82f6",
    bg: "#dbeafe",
  },
  pending: {
    label: "В работе",
    color: "#f59e0b",
    bg: "#fef3c7",
  },
  approved: {
    label: "Одобрена",
    color: "#10b981",
    bg: "#d1fae5",
  },
  rejected: {
    label: "Отклонена",
    color: "#ef4444",
    bg: "#fee2e2",
  },
};

export const useOrderStatus = () => {
  const getStatusMeta = (status: OrderStatus) => {
    return statusConfig[status] || statusConfig.create;
  };

  const getStatusStyle = (status: OrderStatus) => {
    const meta = getStatusMeta(status);
    return {
      color: meta.color,
      backgroundColor: meta.bg,
    };
  };

  const getStatusLabel = (status: OrderStatus) => {
    return getStatusMeta(status).label;
  };

  const getStatusText = (status: OrderStatus) => {
    return getStatusMeta(status).label;
  };

  const canApprove = (status: OrderStatus) =>
    status === "create" || status === "new" || status === "pending";

  const canReject = (status: OrderStatus) =>
    status === "create" || status === "new" || status === "pending";

  const canCancel = (status: OrderStatus) =>
    status === "approve" || status === "approved";

  return {
    getStatusStyle,
    getStatusLabel,
    getStatusText,
    canApprove,
    canReject,
    canCancel,
  };
};
export type StatusType = "new" | "pending" | "approved" | "rejected";

export const useProfile = () => {
  

  // заглушки
  const name = "Ромашка";
  const status: StatusType = "approved";

  const statusMap = {
    new: {
      icon: "⏱︎",
      title: "Заявка получена",
      text: (name: string) =>
        `Спасибо за то, что оставили заявку.\nОрганизация "${name}" ожидает рассмотрения администратором.`,
      badge: "Новая",
    },
    pending: {
      icon: "✴︎",
      title: "Заявка в работе",
      text: (name: string) =>
        `Спасибо за то, что оставили заявку.\nМы рассматриваем организацию "${name}".`,
      badge: "В в работе",
    },
    approved: {
      icon: "✓",
      title: "Заявка одобрена",
      text: (name: string) =>
        `Ваша заявка была одобрена.\nОрганизация "${name}" теперь активна.`,
      badge: "Одобрено",
    },
    rejected: {
      icon: "✗",
      title: "Заявка отклонена",
      text: () =>
        `Ваша заявка была отклонена.\nНа вашу почту было отправлено письмо с объяснением причины.`,
      badge: "Отклонено",
    },
  };

  const currentStatus = statusMap[status];

  return {
    name,
    status,
    currentStatus,
  };
};
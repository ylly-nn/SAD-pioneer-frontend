type AxiosError = any;

export const getErrorMessage = (err: AxiosError): string => {
  const status = err.response?.status;
  const data = err.response?.data;
  const url: string = err.config?.url || "";

  // если бек вернул строку
  const backendMessage =
    typeof data === "string" ? data : data?.message;

  // Авторизация

  if (url.includes("auth/login")) {
    if (status === 401) return "Неверный email или пароль";
    if (status === 400) return "Введите email и пароль";
  }

  if (url.includes("auth/register")) {
    if (status === 409) return "Пользователь уже существует";
    if (status === 400) return "Некорректные данные для регистрации";
  }

  if (url.includes("auth/verify")) {
    if (status === 400) return "Неверный или просроченный код";
  }

  if (url.includes("auth/forgot-password")) {
    if (status === 404) return "Пользователь с таким email не найден";
    if (status === 400) return "Некорректный email";
  }

  if (url.includes("auth/verify-reset-code")) {
    if (status === 400) return "Неверный или просроченный код";
  }

  if (url.includes("auth/set-password")) {
    if (status === 400) return "Ошибка сброса пароля";
  }

  if (url.includes("auth/refresh")) {
    if (status === 401) return "Сессия истекла, войдите снова";
  }

  // Пользователь

  if (url.includes("client")) {
    if (status === 401) return "Вы не авторизованы";
  }

  // Организация

  if (url.includes("company")) {
    if (status === 403) return "У вас нет доступа к компании";
    if (status === 404) return "Компания не найдена";
    if (status === 400) return backendMessage || "Ошибка данных";
  }

  if (url.includes("partner")) {
    if (status === 404) return "Заявка не найдена";
  }

  // Заказы

  if (url.includes("order")) {
    if (status === 400) return backendMessage || "Ошибка создания заказа";
  }

  // Записи

  if (url.includes("branch")) {
    if (status === 401) return "Необходима авторизация";
  }

  // Общие

  if (backendMessage && status !== 401) return backendMessage;

  switch (status) {
    case 400:
      return "Некорректные данные";
    case 401:
      return "Не авторизован";
    case 403:
      return "Нет доступа";
    case 404:
      return "Ничего не найдено";
    case 409:
      return "Конфликт данных";
    case 500:
      return "Ошибка сервера";
    default:
      return "Что-то пошло не так";
  }
};
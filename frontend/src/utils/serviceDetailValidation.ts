// utils/serviceDetailValidation.ts

export type ServiceForm = {
  name: string;
  duration: string;
  price: string;
};

export type ServiceErrors = {
  name?: string;
  duration?: string;
  price?: string;
};

export const validateServiceForm = (
  form: ServiceForm
): ServiceErrors => {
  const errors: ServiceErrors = {};

  // название
  const name = form.name.trim();

  if (!name) {
    errors.name = "Введите название";
  } else if (name.length < 2) {
    errors.name = "Слишком короткое название";
  } else if (name.length > 60) {
    errors.name = "Слишком длинное название";
  }

  // время
  const duration = Number(form.duration);

  if (!form.duration) {
    errors.duration = "Укажите длительность";
  } else if (isNaN(duration)) {
    errors.duration = "Некорректное значение";
  } else if (duration <= 0) {
    errors.duration = "Должно быть больше 0";
  } else if (duration > 1440) {
    errors.duration = "Не больше 24 часов";
  }

  // цена
  const price = Number(form.price);

  if (!form.price) {
    errors.price = "Укажите цену";
  } else if (isNaN(price)) {
    errors.price = "Некорректное значение";
  } else if (price < 0) {
    errors.price = "Не может быть отрицательной";
  } else if (price > 1_000_000) {
    errors.price = "Слишком большая цена";
  }

  return errors;
};
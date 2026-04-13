export type FormData = {
  city: string;
  address: string;
  openning_time: string;
  closing_time: string;
};

export type FormErrors = {
  city?: string;
  address?: string;
  openning_time?: string;
  closing_time?: string;
};

const CITY_REGEX = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const ADDRESS_REGEX = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,-]+$/;

export const validateBranchForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  // город
  const city = formData.city.trim();

  if (!city) {
    errors.city = "Введите город";
  } else if (!CITY_REGEX.test(city)) {
    errors.city = "Только буквы";
  } else if (city.length < 2) {
    errors.city = "Слишком короткое название";
  }

  // адрес
  const address = formData.address.trim();

  if (!address) {
    errors.address = "Введите адрес";
  } else if (!ADDRESS_REGEX.test(address)) {
    errors.address = "Недопустимые символы";
  } else {
    const parts = address.split(/\s+/);
    if (parts.length < 2) {
      errors.address = "Улица и дом обязательны";
    }
  }

  // время
  if (!formData.openning_time) {
    errors.openning_time = "Укажите время открытия";
  }

  if (!formData.closing_time) {
    errors.closing_time = "Укажите время закрытия";
  }

  if (formData.openning_time && formData.closing_time) {
    if (formData.openning_time >= formData.closing_time) {
      errors.closing_time = "Закрытие позже открытия";
    }
  }

  return errors;
};
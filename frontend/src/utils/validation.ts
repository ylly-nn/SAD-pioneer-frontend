/**
 * Валидация email
 * @param email - email для проверки
 * @returns строку с ошибкой или пустую строку, если ошибок нет
 */
export const validateEmail = (email: string): string => {
  if (!email) {
    return "Email обязателен для заполнения";
  }

  if (email.length < 6 || email.length > 64) {
    return "Email должен быть от 6 до 64 символов";
  }

  if (/\s/.test(email)) {
    return "Email не должен содержать пробелов";
  }

  const atSymbols = email.match(/@/g);
  if (!atSymbols || atSymbols.length !== 1) {
    return "Email должен содержать ровно один символ @";
  }

  // Разделяем на локальную часть и домен
  const [localPart, domain] = email.split('@');

  if (!localPart || localPart.length === 0) {
    return "Локальная часть email не может быть пустой";
  }

  const localPartRegex = /^[a-zA-Z0-9.-]+$/;
  if (!localPartRegex.test(localPart)) {
    return "Локальная часть email может содержать только латинские буквы, цифры, тире и точку";
  }

  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return "Локальная часть email не может начинаться или заканчиваться точкой";
  }

  if (localPart.includes('..')) {
    return "Локальная часть email не может содержать две точки подряд";
  }

  if (!domain) {
    return "Домен email не может быть пустым";
  }

  if (domain.endsWith('.')) {
    return "Домен не может заканчиваться точкой";
  }

  const domainRegex = /^[a-zA-Z0-9.-]+$/;
  if (!domainRegex.test(domain)) {
    return "Домен может содержать только латинские буквы, цифры, тире и точку";
  }

  if (domain.includes('..')) {
    return "Домен не может содержать две точки подряд";
  }

  if (domain.startsWith('.')) {
    return "Домен не может начинаться с точки";
  }

  const domainParts = domain.split('.');
  const lastPart = domainParts[domainParts.length - 1];
  if (lastPart.length < 2) {
    return "Домен должен содержать как минимум 2 символа после последней точки";
  }

  return "";
};

/**
 * Валидация имени/фамилии
 * @param value - значение для проверки
 * @param fieldName - название поля (для сообщения об ошибке)
 * @returns строку с ошибкой или пустую строку, если ошибок нет
 */
export const validateName = (value: string, fieldName: string): string => {
  if (!value) {
    return `${fieldName} обязательна для заполнения`;
  }

  if (value.length < 2 || value.length > 100) {
    return `${fieldName} должна быть от 2 до 100 символов`;
  }

  if (/\s/.test(value)) {
    return `${fieldName} не должна содержать пробелов`;
  }

  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ'-]+$/;
  if (!nameRegex.test(value)) {
    return `${fieldName} может содержать только буквы, дефис и апостроф`;
  }

  if (/^[-']|[-']$/.test(value)) {
    return `${fieldName} не может начинаться или заканчиваться дефисом или апострофом`;
  }

  return "";
};

//Интерфейс для ошибок формы
export interface FormErrors {
  email?: string;
  name?: string;
  surname?: string;
  [key: string]: string | undefined;
}

//Хелпер для проверки всех полей формы

export const validateForm = (data: {
  email: string;
  name: string;
  surname: string;
}): FormErrors => {
  return {
    email: validateEmail(data.email),
    name: validateName(data.name, "Имя"),
    surname: validateName(data.surname, "Фамилия"),
  };
};

//Проверка, есть ли ошибки в форме
export const hasErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some(error => error && error.length > 0);
};

//Проверка, валидна ли форма
export const isFormValid = (
  data: { email: string; name: string; surname: string },
  errors: FormErrors
): boolean => {
  return (
    data.email.length > 0 &&
    data.name.length > 0 &&
    data.surname.length > 0 &&
    !hasErrors(errors)
  );
};
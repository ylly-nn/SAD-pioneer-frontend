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

  const localPartRegex = /^[a-zA-Z0-9._-]+$/;
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

  const domainRegex = /^[a-zA-Z0-9._-]+$/;
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

/**
 * Валидация названия организации
 * @param value - значение для проверки
 * @returns строку с ошибкой или пустую строку, если ошибок нет
 */
export const validateOrgName = (value: string): string => {
  if (!value) {
    return "Название организации обязательно для заполнения";
  }

  if (value.length < 3 || value.length > 100) {
    return "Название организации должно быть от 3 до 100 символов";
  }

  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  if (!regex.test(value)) {
    return "Название организации может содержать только буквы (рус/лат), дефис и пробел";
  }

  return "";
};

/**
 * Валидация краткого названия организации
 * @param value - значение для проверки
 * @returns строку с ошибкой или пустую строку, если ошибок нет
 */
export const validateShortOrgName = (value: string): string => {
  if (!value) {
    return "Краткое название организации обязательно для заполнения";
  }

  if (value.length < 3 || value.length > 50) {
    return "Краткое название организации должно быть от 3 до 50 символов";
  }

  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  if (!regex.test(value)) {
    return "Краткое название организации может содержать только буквы (рус/лат), дефис и пробел";
  }

  return "";
};

/**
 * Валидация ИНН
 * @param value - значение для проверки
 * @returns строку с ошибкой или пустую строку, если ошибок нет
 */
export const validateINN = (value: string): string => {
  if (!value) {
    return "ИНН обязателен для заполнения";
  }

  const digitsRegex = /^\d+$/;
  if (!digitsRegex.test(value)) {
    return "ИНН должен содержать только цифры";
  }

  if (value.length !== 10 && value.length !== 12) {
    return "ИНН должен быть ровно 10 или 12 символов";
  }

  return "";
};

/**
 * Валидация КПП
 * @param value - значение для проверки
 * @returns строку с ошибкой или пустую строку, если ошибок нет
 */
export const validateKPP = (value: string): string => {
  if (!value) {
    return "КПП обязателен для заполнения";
  }

  const digitsRegex = /^\d+$/;
  if (!digitsRegex.test(value)) {
    return "КПП должен содержать только цифры";
  }

  if (value.length !== 9) {
    return "КПП должен быть ровно 9 символов";
  }

  return "";
};

/**
 * Валидация ОГРН
 * @param value - значение для проверки
 * @returns строку с ошибкой или пустую строку, если ошибок нет
 */
export const validateOGRN = (value: string): string => {
  if (!value) {
    return "ОГРН обязателен для заполнения";
  }

  const digitsRegex = /^\d+$/;
  if (!digitsRegex.test(value)) {
    return "ОГРН должен содержать только цифры";
  }

  if (value.length !== 13) {
    return "ОГРН должен быть ровно 13 символов";
  }

  return "";
};
/**
 * Валидация телефона
 * @param phone - телефон для проверки (10 цифр без +7)
 * @returns строку с ошибкой или пустую строку, если ошибок нет
 */
export const validatePhone = (phone: string): string => {
  if (!phone) {
    return "Телефон обязателен для заполнения";
  }

  const digitsRegex = /^\d+$/;
  if (!digitsRegex.test(phone)) {
    return "Телефон должен содержать только цифры";
  }

  if (phone.length !== 10) {
    return "Телефон должен быть ровно 10 символов (без +7, 7 или 8)";
  }

  return "";
};

/**
 * Валидация пароля
 * @param password - пароль для проверки
 * @returns строку с ошибкой или пустую строку, если ошибок нет
 */
export const validatePassword = (password: string): string => {
  if (!password) {
    return "Пароль обязателен для заполнения";
  }

  if (password.length < 8 || password.length > 24) {
    return "Пароль должен быть от 8 до 24 символов";
  }

  if (/\s/.test(password)) {
    return "Пароль не должен содержать пробелов";
  }

  // Проверка на допустимые символы
  const allowedRegex = /^[a-zA-Z0-9~!?@#$%^&*_\-+()\[\]{}/\\"'. ,:;]+$/;
  if (!allowedRegex.test(password)) {
    return "Пароль содержит недопустимые символы";
  }

  // Проверка на наличие хотя бы одной заглавной буквы
  if (!/[A-Z]/.test(password)) {
    return "Пароль должен содержать хотя бы одну заглавную букву";
  }

  // Проверка на наличие хотя бы одной строчной буквы
  if (!/[a-z]/.test(password)) {
    return "Пароль должен содержать хотя бы одну строчную букву";
  }

  // Проверка на наличие хотя бы одной цифры
  if (!/[0-9]/.test(password)) {
    return "Пароль должен содержать хотя бы одну цифру";
  }

  // Проверка на наличие хотя бы одного спецсимвола
  const specialCharsRegex = /[~!?@#$%^&*_\-+()\[\]{}/\\"'. ,:;]/;
  if (!specialCharsRegex.test(password)) {
    return "Пароль должен содержать хотя бы один специальный символ";
  }

  return "";
};

/**
 * Валидация подтверждения пароля
 * @param password - пароль
 * @param confirmPassword - подтверждение пароля
 * @returns строку с ошибкой или пустую строку, если ошибок нет
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) {
    return "Подтверждение пароля обязательно";
  }

  if (password !== confirmPassword) {
    return "Пароли не совпадают";
  }

  return "";
};


// Интерфейс для ошибок формы регистрации
export interface RegisterFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

// Интерфейс для ошибок формы логина
export interface LoginFormErrors {
  email?: string;
  password?: string;
}

// Хелпер для проверки всех полей формы регистрации
export const validateRegisterForm = (data: {
  email: string;
  password: string;
  confirmPassword: string;
}): RegisterFormErrors => {
  return {
    email: validateEmail(data.email),
    password: validatePassword(data.password),
    confirmPassword: validateConfirmPassword(data.password, data.confirmPassword),
  };
};

// Хелпер для проверки всех полей формы логина
export const validateLoginForm = (data: {
  email: string;
  password: string;
}): LoginFormErrors => {
  return {
    email: validateEmail(data.email),
    password: validatePassword(data.password),
  };
};

// Проверка, есть ли ошибки в форме регистрации
export const hasRegisterErrors = (errors: RegisterFormErrors): boolean => {
  return Object.values(errors).some(error => error && error.length > 0);
};

// Проверка, валидна ли форма регистрации
export const isRegisterFormValid = (
  data: { email: string; password: string; confirmPassword: string },
  errors: RegisterFormErrors
): boolean => {
  return (
    data.email.length > 0 &&
    data.password.length > 0 &&
    data.confirmPassword.length > 0 &&
    !hasRegisterErrors(errors)
  );
};

// Проверка, валидна ли форма логина
export const isLoginFormValid = (
  data: { email: string; password: string },
  errors: LoginFormErrors
): boolean => {
  return (
    data.email.length > 0 &&
    data.password.length > 0 &&
    !errors.email &&
    !errors.password
  );
};

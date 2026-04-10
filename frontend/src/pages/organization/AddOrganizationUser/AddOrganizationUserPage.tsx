import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddOrganizationUserPage.module.scss";
import axiosInstance from "../../../api/axios";
import { useNavigation } from "../../../hooks/useNavigation";
import { ROUTES } from "../../../constants/routes";
import { usePageToast } from "../../../hooks/usePageToast";

const AddOrganizationUserPage = () => {
  usePageToast();
  const { goToOrganization }= useNavigation();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (emailValue: string): string => {
    if (!emailValue) return "Email обязателен";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
      return "Введите корректный email адрес (например: user@domain.com)";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    const validationError = validateEmail(value);
    setEmailError(validationError);
    
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Отправка запроса на добавление пользователя:", { email });
      
      const response = await axiosInstance.post("/company/users", {
        email: email
      });

      console.log("Пользователь добавлен:", response.data);
      
      navigate(ROUTES.ORGANIZATION.PROFILE, {
        state: { message: "Пользователь успешно добавлен" }
      });

    } catch (err: any) {
      console.error("Ошибка при добавлении пользователя:", err);
      
      if (err.response) {
        console.log("Данные ошибки от сервера:", err.response.data);
        console.log("Статус ошибки:", err.response.status);
        console.log("Заголовки ошибки:", err.response.headers);
        
        const errorMessage = err.response.data?.message || 
                            err.response.data?.error || 
                            JSON.stringify(err.response.data) ||
                            "Неизвестная ошибка сервера";
        
        if (err.response.status === 400) {
          if (errorMessage.includes("already") || errorMessage.includes("уже")) {
            setError("Пользователь уже добавлен в эту организацию");
          } else if (errorMessage.includes("not found") || errorMessage.includes("не найден")) {
            setError("Пользователь с таким email не зарегистрирован в системе");
          } else if (errorMessage.includes("invalid") || errorMessage.includes("некорректный")) {
            setError("Некорректный email адрес");
          } else {
            setError(`Ошибка: ${errorMessage}`);
          }
        } else if (err.response.status === 401) {
          setError("Сессия истекла. Пожалуйста, войдите снова");
        } else if (err.response.status === 403) {
          setError("У вас нет прав для добавления пользователей");
        } else if (err.response.status === 404) {
          setError("Сервис не найден. Проверьте настройки API");
        } else if (err.response.status === 409) {
          setError("Пользователь уже добавлен в компанию");
        } else {
          setError(errorMessage);
        }
      } else if (err.request) {
        console.error("Нет ответа от сервера:", err.request);
        setError("Сервер не отвечает. Проверьте подключение к интернету");
      } else {
        console.error("Ошибка при настройке запроса:", err.message);
        setError("Произошла ошибка при отправке запроса");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Добавление пользователя</h1>
          <button
            className={styles.close}
            onClick={() => goToOrganization()}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <div className={styles.formContainer}>
          <p className={styles.description}>
            Введите почту пользователя, которого хотите добавить в организацию
          </p>
          
          <p className={styles.note}>
            Примечание: пользователь должен быть зарегистрирован в системе
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Почта
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@company.com"
                required
                className={`${styles.input} ${(emailError || error) ? styles.inputError : ''}`}
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting}
              />
              {emailError && <div className={styles.error}>{emailError}</div>}
              {error && !emailError && (
                <div className={styles.error}>
                  {error}
                  {error.includes("Пользователь уже добавлен")}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={isSubmitting || !email || !!emailError}
            >
              {isSubmitting ? "Добавление..." : "Добавить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrganizationUserPage;
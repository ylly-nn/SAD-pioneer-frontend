import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddOrganizationUserPage.module.scss";

const AddOrganizationUserPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Введите корректный email адрес");
      return;
    }

    setIsSubmitting(true);

    try {
      // Здесь будет API запрос для добавления пользователя
      console.log("Добавление пользователя:", email);
      
      // Имитация задержки запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Успешное добавление - возврат на страницу организации
      navigate("/organization", { 
        state: { message: "Пользователь успешно добавлен" } 
      });
    } catch (err) {
      setError("Произошла ошибка при добавлении пользователя");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/organization");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Добавление пользователя</h1>
          <button
            className={styles.close}
            onClick={handleBack}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <div className={styles.formContainer}>
          <p className={styles.description}>
            Введите почту пользователя которого хотите добавить
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
                placeholder="введите email"
                required
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              {error && <div className={styles.error}>{error}</div>}
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={isSubmitting || !email}
            >
              {isSubmitting ? "Добавление..." : "Добавить"}
            </button>
          </form>

          <div className={styles.infoBox}>
            <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none">
              <path 
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
              <path 
                d="M12 16V12M12 8H12.01" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
            </svg>
            <p>
              Пользователь получит уведомление на указанную почту 
              и сможет присоединиться к организации
            </p>
          </div>

          <div className={styles.footer}>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrganizationUserPage;
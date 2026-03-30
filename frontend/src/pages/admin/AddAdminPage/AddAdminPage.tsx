import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddAdminPage.module.scss";
import api from "../../../api/axios"; 

const AddAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Введите корректный email адрес");
      return;
    }

    if (!name.trim()) {
      setError("Введите имя");
      return;
    }

    if (!surname.trim()) {
      setError("Введите фамилию");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/admin/create-admin', {
        email: email,
        name: name,
        surname: surname
      });

      console.log("Админ успешно добавлен:", response.data);
      
      navigate("/admin", { 
        state: { message: "Администратор успешно добавлен" } 
      });
    } catch (err: any) {
      console.error("Ошибка при добавлении админа:", err);
      setError(err.response?.data?.message || "Произошла ошибка при добавлении админа");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Добавление админа</h1>
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
            Заполните данные для добавления нового администратора
          </p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="surname">
                Фамилия
              </label>
              <input
                id="surname"
                name="surname"
                type="text"
                placeholder="введите фамилию"
                required
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                autoComplete="family-name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Имя
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="введите имя"
                required
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email
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
              disabled={isSubmitting || !email || !name || !surname}
            >
              {isSubmitting ? "Добавление..." : "Добавить администратора"}
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
              Администратору будет отправлено приглашение на указанный email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
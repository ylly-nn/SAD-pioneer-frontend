import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NewPasswordPage.module.scss";

const NewPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    if (password.length < 6) {
      setMessage("Пароль должен содержать минимум 6 символов");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/auth/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          new_password: password
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Пароль успешно изменен!");
        setTimeout(() => {
          navigate("/user/login");
        }, 2000);
      } else {
        setMessage(data.message || "Ошибка смены пароля");
      }
    } catch {
      setMessage("Ошибка смены пароля");
    } finally {
      setIsLoading(false);
    }
  };

  // Если email не передан, перенаправляем обратно
  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Новый пароль</h2>
        
        <p className={styles.emailText}>
          Создайте новый пароль для<br />{email}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className={styles.label}>Новый пароль</label>
              <button
                type="button"
                className={styles.eyeButton}
                onClick={togglePassword}
                aria-label={
                  showPassword ? "Скрыть пароль" : "Показать пароль"
                }
              >
                {showPassword ? "●" : "○"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Введите новый пароль"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className={styles.label}>Подтверждение пароля</label>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Подтвердите пароль"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className={styles.submit} type="submit" disabled={isLoading}>
            {isLoading ? "Сохранение..." : "Сменить пароль"}
          </button>
        </form>

        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
};

export default NewPasswordPage;
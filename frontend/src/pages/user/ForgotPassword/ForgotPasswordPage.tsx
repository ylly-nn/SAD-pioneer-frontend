import { useState } from "react";
import { sendResetCode } from "../../../services/auth/sendResetCode";
import styles from "./ForgotPasswordPage.module.scss";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await sendResetCode(email);
      setMessage(data.message);
      setCodeSent(true);
    } catch {
      setMessage("Ошибка отправки кода");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/auth/verify-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          code: code
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Переход на страницу создания нового пароля
        navigate("/user/new-password", { state: { email } });
      } else {
        setMessage(data.message || "Неверный код");
      }
    } catch {
      setMessage("Ошибка проверки кода");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {!codeSent ? "Восстановление пароля" : "Подтверждение кода"}
        </h2>

        {!codeSent ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Почта</label>
              <input
                type="email"
                placeholder="Введите email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className={styles.submit} type="submit" disabled={isLoading}>
              {isLoading ? "Отправка..." : "Отправить код"}
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleVerifyCode}>
            <p className={styles.codeText}>
              Мы отправили код на почту:<br />{email}
            </p>

            <div className={styles.field}>
              <label className={styles.label}>Код подтверждения</label>
              <input
                type="text"
                placeholder="Введите код из письма"
                className={styles.input}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <button className={styles.submit} type="submit" disabled={isLoading}>
              {isLoading ? "Проверка..." : "Подтвердить код"}
            </button>
          </form>
        )}

        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
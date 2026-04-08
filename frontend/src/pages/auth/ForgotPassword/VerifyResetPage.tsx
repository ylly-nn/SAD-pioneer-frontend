import { useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./ForgotPasswordPage.module.scss";
import { useNavigation } from "../../../hooks/useNavigation";

const VerifyResetPage = () => {
  const { goToLogin } = useNavigation();

  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/auth/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          code
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Ошибка проверки кода");
      } else {
        console.log("код подтвержден");
      }

    } catch {
      setError("Ошибка соединения");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.header}>
          <h1 className={styles.title}>Подтверждение</h1>
          <button
            className={styles.close}
            onClick={() => goToLogin("user")}
            aria-label="Закрыть"
          >
            x
          </button>
        </div>

        <p className={styles.a}>
          Мы отправили код на почту:<br/>{email}
        </p>

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Введите код"
              value={code}
              className={styles.input}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submit} disabled={isLoading}>
              {isLoading ? "Проверка..." : "Подтвердить"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default VerifyResetPage;
import styles from "./ForgotPasswordPage.module.scss";
import { useForgotPassword } from "../../../hooks/useForgotPassword";

const ForgotPasswordPage = () => {
  const {
    email,
    code,
    password,
    confirmPassword,
    step,
    message,
    error,
    isLoading,
    setEmail,
    setCode,
    setPassword,
    setConfirmPassword,
    sendEmail,
    verifyCode,
    setPasswordHandler,
  } = useForgotPassword();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Восстановление пароля</h2>

        {/* EMAIL */}
        {step === "email" && (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              sendEmail();
            }}
          >
            <input
              type="email"
              placeholder="Введите email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className={styles.submit} disabled={isLoading}>
              {isLoading ? "Отправка..." : "Отправить код"}
            </button>
          </form>
        )}

        {/* CODE */}
        {step === "code" && (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              verifyCode();
            }}
          >
            <p className={styles.codeText}>
              Код отправлен на:<br />{email}
            </p>

            <input
              type="text"
              placeholder="Введите код"
              className={styles.input}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <button className={styles.submit} disabled={isLoading}>
              {isLoading ? "Проверка..." : "Подтвердить"}
            </button>
          </form>
        )}

        {/* PASSWORD */}
        {step === "password" && (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              setPasswordHandler();
            }}
          >
            <input
              type="password"
              placeholder="Новый пароль"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Подтвердите пароль"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button className={styles.submit} disabled={isLoading}>
              {isLoading ? "Сохранение..." : "Сменить пароль"}
            </button>
          </form>
        )}

        {message && <div className={styles.message}>{message}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
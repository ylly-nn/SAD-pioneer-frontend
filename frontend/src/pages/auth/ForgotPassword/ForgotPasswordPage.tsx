import styles from "./ForgotPasswordPage.module.scss";
import { useForgotPassword } from "../../../hooks/useForgotPassword";
import { validateEmail, validatePassword, validateConfirmPassword } from "../../../utils/validation";
import { useState, useEffect } from "react";
import { useNavigation } from "../../../hooks/useNavigation";

const ForgotPasswordPage = () => {
  const { goToLogin } = useNavigation();
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

  const [emailError, setEmailError] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (isEmailTouched) {
      const validationError = validateEmail(value);
      setEmailError(validationError);
    }
  };

  const handleEmailBlur = () => {
    setIsEmailTouched(true);
    const validationError = validateEmail(email);
    setEmailError(validationError);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (isPasswordTouched) {
      const validationError = validatePassword(value);
      setPasswordError(validationError);
    }
    
    if (isConfirmPasswordTouched) {
      const confirmError = validateConfirmPassword(value, confirmPassword);
      setConfirmPasswordError(confirmError);
    }
  };

  const handlePasswordBlur = () => {
    setIsPasswordTouched(true);
    const validationError = validatePassword(password);
    setPasswordError(validationError);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (isConfirmPasswordTouched) {
      const validationError = validateConfirmPassword(password, value);
      setConfirmPasswordError(validationError);
    }
  };

  const handleConfirmPasswordBlur = () => {
    setIsConfirmPasswordTouched(true);
    const validationError = validateConfirmPassword(password, confirmPassword);
    setConfirmPasswordError(validationError);
  };

  useEffect(() => {
    if (step === "email") {
      setEmailError("");
      setIsEmailTouched(false);
    } else if (step === "password") {
      setPasswordError("");
      setConfirmPasswordError("");
      setIsPasswordTouched(false);
      setIsConfirmPasswordTouched(false);
    }
  }, [step]);

  const handleSendEmail = async () => {
    const validationError = validateEmail(email);
    setEmailError(validationError);
    setIsEmailTouched(true);

    if (validationError) {
      return;
    }

    await sendEmail();
  };

  const handleSetPassword = async () => {
    const passwordValidationError = validatePassword(password);
    const confirmValidationError = validateConfirmPassword(password, confirmPassword);
    
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmValidationError);
    setIsPasswordTouched(true);
    setIsConfirmPasswordTouched(true);

    if (passwordValidationError || confirmValidationError) {
      return;
    }

    await setPasswordHandler();
  };

  const isEmailValid = email.length > 0 && !emailError && isEmailTouched;

  const arePasswordsValid = password.length > 0 && 
    confirmPassword.length > 0 && 
    !passwordError && 
    !confirmPasswordError &&
    isPasswordTouched &&
    isConfirmPasswordTouched;

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.header}>
          <h1 className={styles.title}>Восстановление пароля</h1>
          <button
            className={styles.close}
            onClick={() => goToLogin("user")}
            aria-label="Закрыть"
          >
            x
          </button>
        </div>

        {step === "email" && (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleSendEmail();
            }}
          >
            <div className={emailError ? styles.fieldWithError : styles.field}>
              <label className={styles.label} htmlFor="email">
                Email <span style={{ color: '#7c415b' }}>*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@mail.com"
                className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                disabled={isLoading}
                autoComplete="email"
              />
              {emailError && <div className={styles.error}>{emailError}</div>}
            </div>

            <button 
              className={styles.submit} 
              disabled={isLoading || (isEmailTouched && !isEmailValid)}
            >
              {isLoading ? "Отправка..." : "Отправить код"}
            </button>
          </form>
        )}

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

            <div className={styles.field}>
              <label className={styles.label} htmlFor="code">
                Код подтверждения <span style={{ color: '#7c415b' }}>*</span>
              </label>
              <input
                id="code"
                type="text"
                placeholder="Введите код из письма"
                className={styles.input}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
              />
            </div>

            <button className={styles.submit} disabled={isLoading || !code.trim()}>
              {isLoading ? "Проверка..." : "Подтвердить"}
            </button>
          </form>
        )}

        {step === "password" && (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleSetPassword();
            }}
          >
            <div className={passwordError ? styles.fieldWithError : styles.field}>
              <label className={styles.label} htmlFor="password">
                Новый пароль <span style={{ color: '#7c415b' }}>*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="От 8 до 24 символов"
                className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                disabled={isLoading}
                autoComplete="new-password"
              />
              {passwordError && <div className={styles.error}>{passwordError}</div>}
              {!passwordError && isPasswordTouched && password.length > 0 && (
                <div className={styles.successHint} style={{ color: '#4caf8b', fontSize: '12px', marginTop: '4px' }}>
                  ✓ Пароль соответствует требованиям
                </div>
              )}
            </div>

            <div className={confirmPasswordError ? styles.fieldWithError : styles.field}>
              <label className={styles.label} htmlFor="confirmPassword">
                Подтверждение пароля <span style={{ color: '#7c415b' }}>*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Повторите пароль"
                className={`${styles.input} ${confirmPasswordError ? styles.inputError : ''}`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
                disabled={isLoading}
                autoComplete="new-password"
              />
              {confirmPasswordError && <div className={styles.error}>{confirmPasswordError}</div>}
            </div>

            <button 
              className={styles.submit} 
              disabled={isLoading || (isPasswordTouched && isConfirmPasswordTouched && !arePasswordsValid)}
            >
              {isLoading ? "Сохранение..." : "Сменить пароль"}
            </button>
          </form>
        )}

        {message && <div className={styles.message}>{message}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
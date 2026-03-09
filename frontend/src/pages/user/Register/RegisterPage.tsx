import styles from "./RegisterPage.module.scss";

import { ROUTES } from "../../../constants/routes";
import { useHandlesLogic } from "../../../hooks/handlesLogic";

import { Link } from "react-router-dom";

const RegisterPage = () => {

    const {
    handleHome,
  } = useHandlesLogic();

  const handleSubmit = async (e: React.FormEvent) => {
  };

  return (
    <div className={styles.page}>

      <div className={styles.card}>

        <div className={styles.header}>
          <h1 className={styles.title}>Регистрация</h1>
          <button 
          className={styles.close} 
          onClick={handleHome} 
          aria-label="Закрыть"
          >
            x
          </button>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">почта</label>
              <input
                id="email"
                type="email"
                placeholder="введите email"
                required
                className={styles.input}
                autoComplete="email"
              />
              
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">пароль</label>
              <input
              id="password"
                type="password"
                placeholder="введите пароль"
                required
                className={styles.input}
                autoComplete="new-password"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirm-password">подтвердите пароль</label>
              <input
              id="confirm-password"
                type="password"
                placeholder="повторите пароль"
                required
                className={styles.input}
                autoComplete="new-password"
              />
            </div>

            <div className={styles.fieldCheckbox}>
              <label className={styles.checkboxLabel}>
                <input 
                type="checkbox" 
                name="terms"
                required
                className={styles.checkbox}
                />
                <span className={styles.checkboxCustom}></span>
                <span className={styles.checkboxText}>принимаю условия политики конфиденциальности</span>
              </label>
            </div>

            <button
              type="submit"
              className={styles.submit}
            >
              получить код
            </button>
          </form>

          <p className={styles.footer}>
            уже есть аккаунт? 
            <Link to={ROUTES.USER.LOGIN} className={styles.link}>войти</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

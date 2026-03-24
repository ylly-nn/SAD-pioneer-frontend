import { useLocation } from 'react-router-dom';
import { ROUTES } from "../../../constants/routes";
import { useVerification } from '../../../hooks/useVerification';
//import { useNavigation } from "../../../hooks/useNavigation";
import { Link } from "react-router-dom";
import styles from './RegisterPage.module.scss';

const VerifyPage = () => {
    //const { goHome } = useNavigation();
  const location = useLocation();
  const email = location.state?.email || '';
  const { code, error, isLoading, handleCodeChange, handleSubmit } = useVerification(email);

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.header}>
        <h1 className={styles.title}>Подтверждение аккаунта</h1>
        </div>

        <p className={styles.a}>Мы отправили код на почту:<br/>{email}</p>
        <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Введите код"
            value={code}
            className={styles.input}
            onChange={handleCodeChange}
            required
          />
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? 'Проверка...' : 'Подтвердить'}
          </button>
        </form>

        <p className={styles.footer}>
            <Link to={ROUTES.USER.REGISTER} className={styles.link}>вернуться к регистрации</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
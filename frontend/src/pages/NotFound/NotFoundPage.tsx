import styles from "./NotFoundPage.module.scss";

import { useNavigation } from "../../hooks/useNavigation";

const NotFoundPage = () => {

  const {
    goHome

  } = useNavigation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>страница не найдена</p>
        <p className={styles.text}>
          возможно, она была удалена или вы ввели неверный адрес
        </p>
        <button onClick={goHome}>
          вернуться на главную
      </button>
      </div>
    </div>
  );
};

export default NotFoundPage;

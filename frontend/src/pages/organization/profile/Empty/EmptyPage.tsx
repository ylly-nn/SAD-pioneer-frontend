import styles from "./EmptyPage.module.scss";
import { useNavigation } from "../../../../hooks/useNavigation";
import { usePageToast } from "../../../../hooks/usePageToast";

const EmptyPage = () => {
  usePageToast();
  const {
    goHome,
    goToCreateForm
  } = useNavigation();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Похоже у вас нет организации</h1>
        <div style={{ height: '20px' }}></div>
        <p className={styles.description}>
          Попросите вас добавить или оформите заявку по кнопке ниже
        </p>
        <div style={{ height: '20px' }}></div>
        <button 
          className={styles.requestButton}
          onClick={() => goToCreateForm()}
        >
          Оформить заявку
        </button>

        <div className={styles.footer}>
          <button className={styles.backLink} onClick={() => goHome()}>
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
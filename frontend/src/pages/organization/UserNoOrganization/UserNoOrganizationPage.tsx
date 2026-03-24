import { useNavigate } from "react-router-dom";
import styles from "./UserNoOrganizationPage.module.scss";

const UserNoOrganizationPage = () => {
  const navigate = useNavigate();

  const handleRequestApplication = () => {
    console.log("Оформить заявку");
    navigate("/organization/view-form");
  };

  const handleBack = () => {
    navigate(-1);
  };

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
          onClick={handleRequestApplication}
        >
          Оформить заявку
        </button>

        <div className={styles.footer}>
          <button className={styles.backLink} onClick={handleBack}>
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserNoOrganizationPage;
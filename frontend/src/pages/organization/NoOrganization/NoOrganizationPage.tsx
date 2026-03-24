import { useNavigate } from "react-router-dom";
import styles from "./NoOrganizationPage.module.scss";

const NoOrganizationPage = () => {
  const navigate = useNavigate();

  const handleCreateRequest = () => {
    // Переход на страницу оформления заявки
    navigate("/organization/view-form");
  };

  const handleBack = () => {
    navigate(-1); // Возврат на предыдущую страницу
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Левая колонка с формой */}
        <div className={styles.leftSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>Запись на услугу</h1>
          </div>

          <div className={styles.content}>
            <div className={styles.card}>
              <div className={styles.iconContainer}>
                <svg 
                  className={styles.icon} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M3 9H21M12 15H12.01M7 15H7.01M17 15H17.01M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              <h2 className={styles.sectionTitle}>Организация</h2>
              
              <p className={styles.message}>
                Похоже у вас нет организации.
              </p>
              
              <p className={styles.subMessage}>
                Оформите заявку - администратор рассмотрит ее
              </p>

              <button 
                className={styles.createButton}
                onClick={handleCreateRequest}
              >
                Оформить заявку
              </button>
            </div>
          </div>

          <div className={styles.footer}>
            <button className={styles.backButton} onClick={handleBack}>
              ← Назад
            </button>
          </div>
        </div>

        {/* Правая колонка с изображением/информацией */}
        <div className={styles.rightSection}>
          <div className={styles.rightContent}>
            <h2 className={styles.rightTitle}>
              Начните работу с нами
            </h2>
            <p className={styles.rightDescription}>
              Создайте заявку, чтобы стать организацией или просто начните записываться на услуги
            </p>
            
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📋</span>
                <div>
                  <h3>Управляйте услугами</h3>
                  <p>Создавайте и настраивайте услуги вашей организации</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📅</span>
                <div>
                  <h3>Онлайн запись</h3>
                  <p>Клиенты могут записываться онлайн 24/7</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📊</span>
                <div>
                  <h3>Аналитика</h3>
                  <p>Отслеживайте показатели вашего бизнеса</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoOrganizationPage;
import styles from "./ConfirmPage.module.scss";
import { useNavigation } from "../../../../hooks/useNavigation";

const ConfirmPage = () => {

  const { goHome } = useNavigation();
  // временно
  const serviceName = "Автомойка";
  const date = "25 марта 2026";
  const time = "14:30";
  const address = "ул. Примерная, д. 123";
  const organizationName = "Ромашка";
  const serviceTime = 33;

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <section className={styles.columns}>
          {/* левая сторона */}
          <div className={styles.leftSection}>

            <div className={styles.formContent}>
              <div className={styles.confirmationCard}>
                <div className={styles.successIcon}>
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" stroke="#549293" strokeWidth="2" />
                    <path
                      d="M8 12L11 15L16 9"
                      stroke="#549293"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h2 className={styles.successTitle}>Запись прошла успешно!</h2>

                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Дата:</span>
                    <span className={styles.detailValue}>{date}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Время:</span>
                    <span className={styles.detailValue}>{time}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Услуга:</span>
                    <span className={styles.detailValue}>{serviceName}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Адрес:</span>
                    <span className={styles.detailValue}>{address}</span>
                  </div>
                </div>

                <button className={styles.submit} onClick={goHome}>
                  На главную
                </button>
              </div>
            </div>

            <div className={styles.footer}>
              <p className={styles.step}>5 / 5</p>
            </div>
          </div>

          {/* правая сторона */}
          <div className={styles.rightSection}>
            <div className={styles.overlay}>
              <div className={styles.overlayContent}>
                <h3 className={styles.overlayTitle}>Спасибо за запись!</h3>
                <p className={styles.overlayText}>
                  Мы ждём вас в <span>{organizationName}</span> в указанное время
                </p>
                <p className={styles.overlayText}>
                  Услуга займёт <span>{serviceTime} минуты</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConfirmPage;
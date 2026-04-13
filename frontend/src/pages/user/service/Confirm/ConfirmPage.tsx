import styles from "./ConfirmPage.module.scss"
import { useNavigation } from "../../../../hooks/useNavigation"
import { useConfirmOrder } from "../../../../hooks/useConfirmOrder"
import { usePageToast } from "../../../../hooks/usePageToast";


const ConfirmPage = () => {
  usePageToast();
  const { goToUser } = useNavigation()
  const { loading, orderData, view } = useConfirmOrder()

  if (loading) {
    return <p>Загрузка...</p>
  }

  if (!orderData || !view) {
    return <p>Заказ не найден</p>
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <section className={styles.columns}>

          <div className={styles.leftSection}>
            <div className={styles.formContent}>
              <div className={styles.confirmationCard}>

                <div className={styles.successIcon}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
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

                <h2 className={styles.successTitle}>
                  Запись прошла успешно!
                </h2>

                <div className={styles.details}>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Дата:</span>
                    <span className={styles.detailValue}>{view.date}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Время:</span>
                    <span className={styles.detailValue}>{view.time}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Услуга:</span>
                    <span className={styles.detailValue}>{view.service}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Адрес:</span>
                    <span className={styles.detailValue}>{view.address}</span>
                  </div>

                </div>

                <button
                  className={styles.submit}
                  onClick={() => goToUser()}
                >
                  На главную
                </button>

              </div>
            </div>

            <div className={styles.footer}>
              <p className={styles.step}>5 / 5</p>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.overlay}>
              <div className={styles.overlayContent}>

                <h3 className={styles.overlayTitle}>
                  Спасибо за запись!
                </h3>

                <p className={styles.overlayText}>
                  Мы ждём вас в <span>{view.organization}</span>
                </p>

                <p className={styles.overlayText}>
                  Услуга займёт <span>{view.duration}</span>
                </p>

              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
  )
}

export default ConfirmPage
import styles from "./SelectServicePage.module.scss"

import { useServices } from "../../../../hooks/useServices"
import { useNavigation } from "../../../../hooks/useNavigation"
import { useBooking } from "../../../../hooks/useBooking"


const SelectServicePage = () => {
  const { goHome, goToSelectOrganization } = useNavigation()
  const { services } = useServices()
  const { updateBooking } = useBooking()

  const handleSelect = (serviceId: string) => {
    // 🔥 сразу сохраняем
    updateBooking({ serviceId })

    // 🔥 сразу переходим
    goToSelectOrganization()
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <section className={styles.columns}>
          
          {/* левая сторона */}
          <div className={styles.leftSection}>
            <div className={styles.header}>
              <h1 className={styles.title}>Запись на услугу</h1>
            </div>

            <div className={styles.formContent}>
              <h2 className={styles.sectionTitle}>
                Выберите услугу
              </h2>

              <div className={styles.serviceGrid}>
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={styles.serviceCard}
                    onClick={() => handleSelect(service.id)}
                  >
                    <div className={styles.cardTitle}>
                      {service.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.footer}>
              <button
                className={styles.backButton}
                onClick={goHome}
              >
                Назад
              </button>

              <p className={styles.step}>1 / 5</p>
            </div>
          </div>

          {/* правая сторона */}
          <div className={styles.rightSection}>
            {/* можно потом красиво сделать превью */}
          </div>

        </section>
      </div>
    </div>
  )
}

export default SelectServicePage
import styles from "./ServiceFormPage.module.scss"
import { useParams } from "react-router-dom"
import { useAddBranchService } from "../../../../hooks/useAddBranchService"
import { useNavigation } from "../../../../hooks/useNavigation"

const ServiceFormPage = () => {
  const { goBack } = useNavigation();
  const { id } = useParams<{ id: string }>()

  const {
    services,
    selectedId,
    loading,
    selectService,
    addServiceToBranch,
  } = useAddBranchService(id!)

  const handleSubmit = async () => {
    await addServiceToBranch()
    goBack()
  }

  if (loading) return <div>Загрузка...</div>

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <section className={styles.columns}>
          
          <div className={styles.leftSection}>
            <div className={styles.header}>
              <h1 className={styles.title}>Добавление услуги</h1>
            </div>

            <div className={styles.formContent}>
              <div className={styles.form}>
                <h2 className={styles.sectionTitle}>
                  Выберите услугу
                </h2>

                

                <button
                  className={styles.submit}
                  onClick={handleSubmit}
                  disabled={!selectedId}
                >
                  Добавить
                </button>
              </div>
            </div>

            <div className={styles.footer}>
              <button
                className={styles.backButton}
                onClick={goBack}
              >
                Назад
              </button>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.serviceGrid}>
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`${styles.serviceCard} ${
                        selectedId === service.id ? styles.active : ""
                      }`}
                      onClick={() => selectService(service.id)}
                    >
                      <div className={styles.cardTitle}>
                        {service.name}
                      </div>
                    </div>
                  ))}
                </div>

          </div>
        </section>
      </div>
    </div>
  )
}

export default ServiceFormPage
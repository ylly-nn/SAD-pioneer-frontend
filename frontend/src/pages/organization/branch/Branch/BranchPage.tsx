import styles from "./BranchPage.module.scss"
import { useParams } from "react-router-dom"
import { useBranchPage } from "../../../../hooks/useBranchPage"
import { useNavigation } from "../../../../hooks/useNavigation"
import { useModal } from "../../../../hooks/useModal";
import UserMenu from "../../../../components/modals/UserMenu";

const BranchPage = () => {
  const { goToOrganizationAddService, goToOrganizationAddServiceDetail } = useNavigation()
  const { id } = useParams<{ id: string }>()

  if (!id) return null

  const {
    branch,
    services,
    loading,
    openServiceId,
    editServiceId,
    toggleDetails,
    toggleEdit,
    deleteDetail,
    formatMinutes,
    getTotalTime,
  } = useBranchPage(id)

  const {
      isModalOpen,
      toggleModal,
      closeModal,
    } = useModal();

  if (loading) return <div>Загрузка...</div>
  if (!branch) return <div>Филиал не найден</div>

  const time = `${branch.open_time.slice(0, 5)} - ${branch.close_time.slice(0, 5)}`

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Филиал</h1>
          <button
            className={styles.toggleModalButton}
            onClick={toggleModal}
          >
            ☰
          </button>
        </div>

        <div className={styles.scrollableArea}>
          <div className={styles.columns}>
            
            {/* Информация */}
            <div className={styles.section}>
              <h2 className={styles.cardTitle}>Информация</h2>

              <div className={styles.infoRow}>
                <span>Город</span>
                <strong>{branch.city}</strong>
              </div>

              <div className={styles.infoRow}>
                <span>Адрес</span>
                <strong>{branch.address}</strong>
              </div>

              <div className={styles.infoRow}>
                <span>Время работы</span>
                <strong>{time}</strong>
              </div>
            </div>

            {/* Услуги */}
            <div className={styles.section}>
              <h2 className={styles.cardTitle}>Услуги</h2>

              {/* ❗ если нет услуг */}
              {services.length === 0 ? (
                <div className={styles.noDetails}>
                  <p>У этого филиала пока нет услуг</p>
                </div>
              ) : (
                <div className={styles.serviceList}>
                  {services.map((service) => {
                    const isOpen = openServiceId === service.id
                    const totalTime = getTotalTime(service.details)

                    return (
                      <div key={service.id} className={styles.serviceItemWrapper}>
                        <div className={styles.serviceItem}>
                          <span className={styles.serviceName}>
                            {service.name}
                          </span>

                          <div className={styles.actions}>
                            {isOpen && (
                              <button
                                className={`${styles.iconButton} ${
                                  editServiceId === service.id
                                    ? styles.active
                                    : ""
                                }`}
                                onClick={() => toggleEdit(service.id)}
                                type="button"
                              >
                                ✎
                              </button>
                            )}

                            <button
                              className={styles.detailsButton}
                              onClick={() => toggleDetails(service.id)}
                              type="button"
                            >
                              {isOpen ? "Скрыть" : "Детали"}
                            </button>
                          </div>
                        </div>

                        {isOpen && (
                          <div className={styles.serviceDetails}>
                            {service.details.length === 0 ? (
                              <div className={styles.noDetails}>
                                <p>Пока нет опций</p>

                                {editServiceId === service.id && (
                                  <button
                                    className={styles.addDetailButton}
                                    onClick={() => goToOrganizationAddServiceDetail(id, service.id)}
                                  >
                                    + Добавить
                                  </button>
                                )}
                              </div>
                            ) : (
                              <>
                                {service.details.map((detail) => (
                                  <div
                                    key={detail.id}
                                    className={styles.detailItem}
                                  >
                                    <span>{detail.name}</span>

                                    <div className={styles.detailRight}>
                                      <span>
                                        {formatMinutes(detail.time)}
                                      </span>
                                      <span>
                                        {detail.price} ₽
                                        </span>

                                      {editServiceId === service.id && (
                                        <button
                                          className={styles.deleteButton}
                                          onClick={() =>
                                            deleteDetail(
                                              service.id,
                                              detail.name
                                            )
                                          }
                                        >
                                          ✕
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}

                                {editServiceId === service.id && (
                                  <button
                                    className={styles.addDetailButton}
                                    onClick={() => goToOrganizationAddServiceDetail(id, service.id)}
                                  >
                                    + Добавить опцию
                                  </button>
                                )}

                                <div className={styles.summary}>
                                  <span>{service.details.length} опции</span>
                                  <span>{formatMinutes(totalTime)}</span>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              <button
                className={styles.addService}
                onClick={() => goToOrganizationAddService(id)}
              >
                + Добавить услугу
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserMenu
  isOpen={isModalOpen}
  onClose={closeModal}
  variant="mixed"
/>
    </div>
  )
}

export default BranchPage
import { useEffect } from "react"
import styles from "./SelectDetailsPage.module.scss"
import { useNavigation } from "../../../../hooks/useNavigation"
import { useBooking } from "../../../../hooks/useBooking"
import { useBranchDetails } from "../../../../hooks/useBranchDetails"
import { usePageToast } from "../../../../hooks/usePageToast";


import washImg from "../../../../assets/wash.jpg"

const SelectDetailsPage = () => {
  usePageToast();
  const { goToSelectOrganization, goToSelectTime } = useNavigation()
  const { booking, isLoaded, updateBooking } = useBooking()

  const {
    details,
    selected,
    toggle,
    isSelected,
    totalDuration,
    totalPrice,
    loading,
    error,
  } = useBranchDetails(booking.serviceByBranchId, booking)

  useEffect(() => {
    if (!isLoaded) return

    if (!booking.serviceByBranchId) {
      goToSelectOrganization()
    }
  }, [booking.serviceByBranchId, isLoaded])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selected.length === 0) {
      alert("Выберите хотя бы одну услугу")
      return
    }

    updateBooking({
      details: {
        items: selected.map((i) => ({
          name: i.detail,
          duration: i.duration_min,
          price: i.price,
        })),
        totalDuration,
        totalPrice,
      },
    })

    goToSelectTime()
  }

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return h > 0 ? `${h} ч ${m} мин` : `${m} мин`
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <section className={styles.columns}>
          {/* LEFT */}
          <div className={styles.leftSection}>
            <div className={styles.header}>
              <h1 className={styles.title}>Запись на услугу</h1>
            </div>

            <div className={styles.formContent}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.sectionTitle}>
                  Уточните детали услуги
                </h2>

                {booking.organization && (
                  <div className={styles.organizationInfo}>
                    <div className={styles.orgName}>
                      {booking.organization.name}
                    </div>
                    <div className={styles.orgAddress}>
                      {booking.organization.address}
                    </div>
                  </div>
                )}

                <div className={styles.totalSection}>
                  <div className={styles.totalRow}>
                    <span>Время:</span>
                    <span>{formatDuration(totalDuration)}</span>
                  </div>

                  <div className={styles.totalRow}>
                    <span>Стоимость:</span>
                    <span>{totalPrice.toFixed(2)} ₽</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.submit}
                >
                  Далее
                </button>
              </form>
            </div>

            <div className={styles.footer}>
              <button
                className={styles.backButton}
                onClick={() => goToSelectOrganization()}
              >
                Назад
              </button>
              <p className={styles.step}>3 / 5</p>
            </div>
          </div>

          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>
              Выберите услуги
              {selected.length > 0 && <span> ({selected.length})</span>}
            </h2>

            <div className={styles.servicesContainer}>
              <div className={styles.servicesList}>
                {loading && <p>Загрузка...</p>}
                {error && <p>{error}</p>}
                {!loading && details.length === 0 && (
                  <p>Нет доступных услуг</p>
                )}

                {details.map((d) => {
                  const active = isSelected(d)

                  return (
                    <div
                      key={d.detail}
                      className={`${styles.serviceItem} ${
                        active ? styles.selected : ""
                      }`}
                      onClick={() => toggle(d)}
                    >
                      <div className={styles.serviceInfo}>
                        <div
                          className={`${styles.checkbox} ${
                            active ? styles.checked : ""
                          }`}
                        >
                          {active && "✓"}
                        </div>

                        <div className={styles.serviceDetails}>
                          <div className={styles.serviceName}>
                            {d.detail}
                          </div>

                          <div className={styles.serviceMeta}>
                            {formatDuration(d.duration_min)} • {" "}
                            {d.price.toFixed(2)} ₽
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.imageSection}>
              <img src={washImg} className={styles.image} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SelectDetailsPage
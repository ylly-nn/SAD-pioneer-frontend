import styles from "./BranchFormPage.module.scss"

import { useNavigation } from "../../../../hooks/useNavigation"
import { useBranchForm } from "../../../../hooks/useBranchFormLogic"

const BranchFormPage = () => {
  const { goHome } = useNavigation()

  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    isFormValid,
  } = useBranchForm()

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        
        <div className={styles.header}>
          <h1 className={styles.title}>Добавление филиала</h1>

          <button
            className={styles.close}
            onClick={goHome}
            type="button"
          >
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          
          {/* город */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="city">
              Город
            </label>

            <input
              id="city"
              name="city"
              placeholder="Москва"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          {/* адрес */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="address">
              Адрес
            </label>

            <input
              id="address"
              name="address"
              placeholder="Улица, дом"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* время */}
          <div className={styles.field}>
            <label className={styles.label}>
              Время работы
            </label>

            <div className={styles.timeRow}>
              <input
                type="time"
                name="openning_time"
                value={formData.openning_time}
                onChange={handleChange}
              />

              <span className={styles.timeDivider}>—</span>

              <input
                type="time"
                name="closing_time"
                value={formData.closing_time}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.submit}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Добавление..." : "Добавить"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default BranchFormPage
import styles from "./ServiceDetailPage.module.scss";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useServiceDetailForm } from "../../../../hooks/useServiceDetailForm";
import { usePageToast } from "../../../../hooks/usePageToast";

const ServiceDetailPage = () => {
  usePageToast();
  const { goBack } = useNavigation();

  const {
    form,
    errors,
    touched,
    isLoading,
    isFormValid,
    handleChange,
    handleSubmit,
  } = useServiceDetailForm();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Добавить опцию</h1>

          <button
            className={styles.close}
            onClick={goBack}
            type="button"
          >
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Название</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            {touched.name && errors.name && (
              <div className={styles.error}>{errors.name}</div>
            )}
          </div>

          <div className={styles.field}>
            <label>Длительность (мин)</label>
            <input
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
            />

            {touched.duration && errors.duration && (
              <div className={styles.error}>{errors.duration}</div>
            )}
          </div>

          <div className={styles.field}>
            <label>Цена</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />

            {touched.price && errors.price && (
              <div className={styles.error}>{errors.price}</div>
            )}
          </div>

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
  );
};

export default ServiceDetailPage;
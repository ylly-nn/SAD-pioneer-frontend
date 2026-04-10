import { useState } from "react";
import styles from "./BranchFormPage.module.scss";

import { useNavigation } from "../../../../hooks/useNavigation";
import { useBranchForm } from "../../../../hooks/useBranchFormLogic";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import { usePageToast } from "../../../../hooks/usePageToast";

const BranchFormPage = () => {
  usePageToast();
  const { goToOrganizationBranches } = useNavigation();

  const [ymapsInstance, setYmapsInstance] = useState<any>(null);
  const [ymapsReady, setYmapsReady] = useState(false);

  const {
    formData,
    errors,
    touched,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    isFormValid,
  } = useBranchForm(ymapsInstance);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Добавление филиала</h1>

          <button
            className={styles.close}
            onClick={() => goToOrganizationBranches()}
            type="button"
          >
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* город */}
          <div className={styles.field}>
            <label className={styles.label}>Город</label>

            <input name="city" value={formData.city} onChange={handleChange} />
            {touched.city && errors.city && (
              <div className={styles.error}>{errors.city}</div>
            )}
          </div>

          {/* адрес */}
          <div className={styles.field}>
            <label className={styles.label}>Адрес</label>

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {touched.address && errors.address && (
              <div className={styles.error}>{errors.address}</div>
            )}
          </div>

          {/* время */}
          <div className={styles.field}>
            <label className={styles.label}>Время работы</label>

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
            {touched.openning_time && errors.openning_time && (
              <div className={styles.error}>{errors.openning_time}</div>
            )}
            {touched.closing_time && errors.closing_time && (
              <div className={styles.error}>{errors.closing_time}</div>
            )}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.submit}
            disabled={!isFormValid || isLoading || !ymapsReady}
          >
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </form>

        <YMaps
          query={{
            apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
            load: "package.full",
          }}
        >
          <Map
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            width={0}
            height={0}
            onLoad={(ymaps) => {
              console.log("🧠 ymaps loaded");

              setYmapsInstance(ymaps);
              setYmapsReady(true);
            }}
          />
        </YMaps>
      </div>
    </div>
  );
};

export default BranchFormPage;

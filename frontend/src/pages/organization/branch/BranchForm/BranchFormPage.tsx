import { useState } from "react";
import styles from "./BranchFormPage.module.scss";

import { useNavigation } from "../../../../hooks/useNavigation";
import { useBranchForm } from "../../../../hooks/useBranchFormLogic";
import { YMaps, Map } from "@pbe/react-yandex-maps";

const BranchFormPage = () => {
  const { goToOrganizationAddBranch} = useNavigation();

  const [ymapsInstance, setYmapsInstance] = useState<any>(null);
  const [ymapsReady, setYmapsReady] = useState(false);

  const {
    formData,
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
            onClick={goToOrganizationAddBranch}
            type="button"
          >
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          
          {/* город */}
          <div className={styles.field}>
            <label className={styles.label}>Город</label>

            <input
              name="city"
              placeholder="Москва"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          {/* адрес */}
          <div className={styles.field}>
            <label className={styles.label}>Адрес</label>

            <input
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
            disabled={!isFormValid || isLoading || !ymapsReady}
          >
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </form>

        {/* 🔥 Невидимая карта ТОЛЬКО чтобы получить ymaps */}
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
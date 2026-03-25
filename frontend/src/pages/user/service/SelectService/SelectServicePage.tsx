import { useState } from "react";
import styles from "./SelectServicePage.module.scss";

import { useHandlesLogic } from "../../../../hooks/handlesLogic";
import { useServices } from "../../../../hooks/useServices";
import { useNavigation } from "../../../../hooks/useNavigation";

import washImg from "../../../../assets/wash.jpg";
import tireImg from "../../../../assets/tire.jpg";

const SelectServicePage = () => {
  const { goHome } = useNavigation();
  const { services } = useServices();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService) return;

    localStorage.setItem("serviceId", selectedService);

    handleSubmitService(selectedService);
  };

  const { handleSubmitService } = useHandlesLogic();

  //const [selectedService, setSelectedService] = useState("wash");

  /*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitService(selectedService);
  };*/

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
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.sectionTitle}>Выберите услугу</h2>

                <div className={styles.serviceGrid}>
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`${styles.serviceCard} ${
                        selectedService === service.id ? styles.active : ""
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className={styles.cardTitle}>{service.name}</div>
                    </div>
                  ))}
                </div>

                <button type="submit" className={styles.submit}>
                  Далее
                </button>
              </form>
            </div>

            <div className={styles.footer}>
              <button className={styles.backButton} onClick={goHome}>
                Назад
              </button>

              <p className={styles.step}>1 / 5</p>
            </div>
          </div>

          {/* правая сторона */}
          <div className={styles.rightSection}>
            {selectedService === "wash" && (
              <img src={washImg} alt="Автомойка" className={styles.image} />
            )}

            {selectedService === "tire" && (
              <img src={tireImg} alt="Шиномонтаж" className={styles.image} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SelectServicePage;

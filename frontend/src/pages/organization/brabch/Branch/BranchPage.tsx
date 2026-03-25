import styles from "./BranchPage.module.scss";
import { useBranchPage } from "../../../../hooks/useBranchPage";

const BranchPage = () => {
  const {
    openServiceId,
    editServiceId,
    toggleDetails,
    toggleEdit,
    formatMinutes,
    getTotalTime,
  } = useBranchPage();

  const city = "Москва";
  const adres = "Примерная, 13";
  const time = "9:00 - 18:30";

  const services = [
    {
      id: 1,
      name: "Мойка",
      details: [
        { id: 1, name: "Мойка днища", time: "30" },
        { id: 2, name: "Мойка стёкол", time: "60" },
      ],
    },
    {
      id: 2,
      name: "Шиномонтаж",
      details: [
        { id: 1, name: "Снятие колеса", time: "15" },
        { id: 2, name: "Балансировка", time: "20" },
      ],
    },
    {
      id: 3,
      name: "Диагностика",
      details: [],
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Филиал</h1>
          <button className={styles.closeButton}>✕</button>
        </div>

        <div className={styles.scrollableArea}>
          <div className={styles.columns}>
            {/* Информация */}
            <div className={styles.section}>
              <h2 className={styles.cardTitle}>Информация</h2>

              <div className={styles.infoRow}>
                <span>Город</span>
                <strong>{city}</strong>
              </div>

              <div className={styles.infoRow}>
                <span>Адрес</span>
                <strong>{adres}</strong>
              </div>

              <div className={styles.infoRow}>
                <span>Время работы</span>
                <strong>{time}</strong>
              </div>
            </div>

            {/* Услуги */}
            <div className={styles.section}>
              <h2 className={styles.cardTitle}>Услуги</h2>

              <div className={styles.serviceList}>
                {services.map((service) => {
                  const isOpen = openServiceId === service.id;
                  const totalTime = getTotalTime(service.details);

                  return (
                    <div key={service.id} className={styles.serviceItemWrapper}>
                      {/* верх */}
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
                              title="Редактировать"
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

                      {/* детали */}
                      {isOpen && (
                        <div className={styles.serviceDetails}>
                          {service.details.length === 0 ? (
                            <div className={styles.noDetails}>
                              <p>Похоже, у этой услуги ещё нет опций</p>

                              {editServiceId === service.id && (
                                <button className={styles.addDetailButton}>
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
                                      {formatMinutes(Number(detail.time))}
                                    </span>

                                    {editServiceId === service.id && (
                                      <button className={styles.deleteButton}>
                                        ✕
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}

                              {editServiceId === service.id && (
                                <button className={styles.addDetailButton}>
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
                  );
                })}
              </div>

              <button className={styles.addService}>+ Добавить услугу</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchPage;

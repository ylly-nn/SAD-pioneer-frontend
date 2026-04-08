import styles from "./ViewFormPage.module.scss";
import { useNavigation } from "../../../hooks/useNavigation";
import { useViewForm } from "../../../hooks/useViewForm";
import { useOrderStatus } from "../../../hooks/useOrderStatus";

const ViewFormPage = () => {
  const { getStatusStyle, getStatusLabel } = useOrderStatus();
  const { goToOrganization } = useNavigation();
  const { formData } = useViewForm();

  const formatDateTime = (date?: string) => {
  if (!date) return "Не указано";

  return new Date(date).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1>Подключение организации</h1>
            <div className={styles.statusBadge} style={getStatusStyle(formData.status)}>
              {getStatusLabel(formData.status)}
            </div>
          </div>
          <button onClick={goToOrganization}>✕</button>
        </div>

        <form className={styles.form}>

          {/* даты */}
          <div className={styles.statusInfo}>
            <div className={styles.field}>
              <label className={styles.label}>Дата подачи</label>
              <p className={styles.fieldValue}>
                {formatDateTime(formData.created_at)  || "—"}
              </p>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Дата рассмотрения</label>
              <p className={styles.fieldValue}>
                {formatDateTime(formData.last_used) || "—"}
              </p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.columns}>
            {/* организация */}
            <div className={styles.section}>
              <h3>Организация</h3>

              <div className={styles.field}>
                <label className={styles.label}>
                  Полное название организации
                </label>
                <p className={styles.fieldValue}>
                  {formData.org_name || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Короткое название организации
                </label>
                <p className={styles.fieldValue}>
                  {formData.org_short_name || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>ИНН</label>
                <p className={styles.fieldValue}>
                  {formData.inn || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>КПП</label>
                <p className={styles.fieldValue}>
                  {formData.kpp || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>ОГРН</label>
                <p className={styles.fieldValue}>
                  {formData.ogrn || "Не указано"}
                </p>
              </div>
            </div>

            {/* контакт */}
            <div className={styles.section}>
              <h3>Контактное лицо</h3>

              <div className={styles.field}>
                <label className={styles.label}>Фамилия</label>
                <p className={styles.fieldValue}>
                  {formData.surname || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Имя</label>
                <p className={styles.fieldValue}>
                  {formData.name || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Отчество</label>
                <p className={styles.fieldValue}>
                  {formData.patronymic || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Почта</label>
                <p className={styles.fieldValue}>
                  {formData.email || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Телефон</label>
                <p className={styles.fieldValue}>
                  {formData.phone || "Не указано"}
                </p>
              </div>
            </div>
          </div>

          {/* дополнительная информация */}

          <div className={styles.infoBlock}>
            <h3>Дополнительная информация</h3>
            <div className={styles.textAreaValue}>
              {formData.info || "Не указано"}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewFormPage;

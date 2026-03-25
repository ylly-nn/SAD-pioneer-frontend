import styles from "./FormViewPage.module.scss";
import { useNavigation } from "../../../hooks/useNavigation";
import { useEditFormAdmin } from "../../../hooks/useEditFormAdmin";
import { useLocation } from "react-router-dom";

const FormViewPage = () => {
  const { goHome } = useNavigation();

  const location = useLocation();
  const formData = location.state?.formData || {};

  const { status, reviewedAt, handleStatusChange, handleSubmit } =
    useEditFormAdmin(formData);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Подключение организации</h1>
          <button onClick={goHome}>✕</button>
        </div>

        <div className={styles.form}>
          

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
                  {/*formData.middle_name || "Не указано"*/}
                  {"Не указано"}
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
                  {formData.phone_number || "Не указано"}
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

          {/* статус */}
          <div className={styles.statusSubmit}>
          <div className={styles.status}>
            <div className={styles.field}>
              <label className={styles.label}>Статус заявки:</label>

              <select
                className={styles.select}
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                {/* нельзя вернуться в "новая" */}
                <option value="новая" disabled>
                  Новая
                </option>

                <option
                  value="в работе"
                  disabled={status === "исполнена" || status === "отклонена"}
                >
                  В работе
                </option>

                <option value="исполнена">Исполнена</option>

                <option value="отклонена">Отклонена</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Дата подачи заявки:</label>
              <p className={styles.fieldValue}>
                {formData.created_at || "Не указано"}
              </p>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Дата рассмотрения заявки:</label>
              <p className={styles.fieldValue}>
                {reviewedAt || "Не рассмотрена"}
              </p>
            </div>
            
          </div>
          <button className={styles.submitButton} onClick={handleSubmit}>Сохранить изменения</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FormViewPage;

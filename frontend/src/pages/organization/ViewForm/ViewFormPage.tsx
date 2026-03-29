import styles from "./ViewFormPage.module.scss";
import { useNavigation } from "../../../hooks/useNavigation";
import { useViewForm } from "../../../hooks/useViewForm";

const CreateFormPage = () => {
  const { goHome } = useNavigation();

  const { formData } = useViewForm();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Подключение организации</h1>
          <button onClick={goHome}>✕</button>
        </div>

        <form className={styles.form}>
          
            {/* статус */}
            <div className={styles.status}>
              <div className={styles.field}>
                <label className={styles.label}>Статус заявки:</label>
                <p className={styles.fieldValue}>
                  {formData.status || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Дата подачи заявки:</label>
                <p className={styles.fieldValue}>
                  {formData.org_name || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Дата рассмотрения заявки:
                </label>
                <p className={styles.fieldValue}>
                  {formData.org_name || "Не указано"}
                </p>
              </div>
            </div>

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
                  {/*formData.patronymic || "Не указано"*/}
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

export default CreateFormPage;

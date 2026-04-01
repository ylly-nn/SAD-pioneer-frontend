import styles from "./FormViewPage.module.scss";
import { useNavigation } from "../../../hooks/useNavigation";
import { useEditFormAdmin } from "../../../hooks/useEditFormAdmin";
import { useState } from "react";

const FormViewPage = () => {
  const { goHome } = useNavigation();
  const { formData, loading, status, reviewedAt, handleStatusChange, handleSubmit } = useEditFormAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // При сохранении изменений, handleSubmit должен отправить на бэк
      // статус и текущую дату рассмотрения
      await handleSubmit();
      
      // Если статус изменился на "одобрена" или "отклонена",
      // дата рассмотрения автоматически установится на бэке
      // или здесь можно передать явно
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Произошла ошибка при сохранении изменений");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div style={{ textAlign: "center", padding: "40px" }}>Загрузка...</div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div style={{ textAlign: "center", padding: "40px" }}>Заявка не найдена</div>
        </div>
      </div>
    );
  }

  const handleLocalStatusChange = (newStatus: string) => {
    handleStatusChange(newStatus);
    
    // Если статус меняется на "одобрена" или "отклонена",
    // можно показать уведомление, что дата рассмотрения будет установлена
    if (newStatus === "одобрена" || newStatus === "отклонена") {
      console.log(`Статус изменен на ${newStatus}, дата рассмотрения будет установлена при сохранении`);
    }
  };

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

          {/* статус */}
          <div className={styles.statusSubmit}>
            <div className={styles.status}>
              <div className={styles.field}>
                <label className={styles.label}>Статус заявки:</label>

                <select
                  className={styles.select}
                  value={status}
                  onChange={(e) => handleLocalStatusChange(e.target.value)}
                >
                  {/* нельзя вернуться в "новая" */}
                  <option value="новая" disabled>
                    Новая
                  </option>

                  <option
                    value="в работе"
                    disabled={status === "одобрена" || status === "отклонена"}
                  >
                    В работе
                  </option>

                  <option value="одобрена">Одобрена</option>

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
            <button 
              className={styles.submitButton} 
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormViewPage;
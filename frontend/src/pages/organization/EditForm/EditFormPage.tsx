import styles from "./EditFormPage.module.scss";
import { useNavigation } from "../../../hooks/useNavigation";
import { useEditForm } from "../../../hooks/useEditForm";

const EditFormPage = () => {
  const { goHome } = useNavigation();

  const {
    formData,
    termsAccepted,
    error,
    isLoading,
    handleChange,
    handleTermsChange,
    handleSubmit,
    isFormValid
  } = useEditForm();

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.header}>
          <h1>Подключение организации</h1>
          <button onClick={goHome}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.columns}>

            {/* организация */}
            <div className={styles.section}>
              <h3>Организация</h3>

              <input name="org_name" placeholder="Полное название"
                value={formData.org_name} onChange={handleChange} />

              <input name="org_short_name" placeholder="Краткое название"
                value={formData.org_short_name} onChange={handleChange} />

              <input name="inn" placeholder="ИНН"
                value={formData.inn} onChange={handleChange} />

              <input name="kpp" placeholder="КПП"
                value={formData.kpp} onChange={handleChange} />

              <input name="ogrn" placeholder="ОГРН"
                value={formData.ogrn} onChange={handleChange} />
            </div>

            {/* контакт */}
            <div className={styles.section}>
              <h3>Контактное лицо</h3>

              <input name="surname" placeholder="Фамилия"
                value={formData.surname} onChange={handleChange} />

              <input name="name" placeholder="Имя"
                value={formData.name} onChange={handleChange} />

              <input name="patronymic" placeholder="Отчество"
                 value={formData.patronymic} onChange={handleChange} />

              <input name="email" type="email" placeholder="Email"
                value={formData.email} onChange={handleChange} />

              <input name="phone" placeholder="Телефон"
                value={formData.phone} onChange={handleChange} />
            </div>

          </div>

          {/* дополнительная информация */}

          <div className={styles.infoBlock}>
            <h3>Дополнительная информация</h3>

            <textarea
              name="info"
              placeholder="Напишите дополнительную информацию..."
              value={formData.info}
              onChange={handleChange}
            />
          </div>

          <div className={styles.footer}>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={handleTermsChange}
              />
              принимаю условия политики конфиденциальности
            </label>

            {error && <div className={styles.error}>{error}</div>}

            <button disabled={!isFormValid || isLoading}>
              {isLoading ? "Отправка..." : "Отправить"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditFormPage;
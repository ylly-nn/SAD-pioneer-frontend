import styles from "./EditFormPage.module.scss";
import { useNavigation } from "../../../hooks/useNavigation";
import { useEditForm } from "../../../hooks/useEditForm";

const EditFormPage = () => {
  const { goToOrganization } = useNavigation();

  const {
    formData,
    termsAccepted,
    error,
    isLoading,
    handleChange,
    handleTermsChange,
    handleSubmit,
    isFormValid,
    fieldErrors
  } = useEditForm();

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.header}>
          <h1>Подключение организации</h1>
          <button onClick={goToOrganization}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.columns}>

            {/* организация */}
            <div className={styles.section}>
              <h3>Организация</h3>

              <input name="org_name" placeholder="Полное название"
                value={formData.org_name} onChange={handleChange} />
              {fieldErrors.org_name && <div className={styles.error}>{fieldErrors.org_name}</div>}

              <input name="org_short_name" placeholder="Краткое название"
                value={formData.org_short_name} onChange={handleChange} />
              {fieldErrors.org_short_name && <div className={styles.error}>{fieldErrors.org_short_name}</div>}
              
              <input name="inn" placeholder="ИНН"
                value={formData.inn} onChange={handleChange} />
              {fieldErrors.inn && <div className={styles.error}>{fieldErrors.inn}</div>}
              
              <input name="kpp" placeholder="КПП"
                value={formData.kpp} onChange={handleChange} />
              {fieldErrors.kpp && <div className={styles.error}>{fieldErrors.kpp}</div>}
              
              <input name="ogrn" placeholder="ОГРН"
                value={formData.ogrn} onChange={handleChange} />
              {fieldErrors.ogrn && <div className={styles.error}>{fieldErrors.ogrn}</div>}
            </div>

            {/* контакт */}
            <div className={styles.section}>
              <h3>Контактное лицо</h3>

              <input name="surname" placeholder="Фамилия"
                value={formData.surname} onChange={handleChange} />
              {fieldErrors.surname && <div className={styles.error}>{fieldErrors.surname}</div>}

              <input name="name" placeholder="Имя"
                value={formData.name} onChange={handleChange} />
              {fieldErrors.name && <div className={styles.error}>{fieldErrors.name}</div>}

              <input name="patronymic" placeholder="Отчество"
                 value={formData.patronymic} onChange={handleChange} />

              <input name="email" type="email" placeholder="Email"
                value={formData.email} onChange={handleChange} />
              {fieldErrors.email && <div className={styles.error}>{fieldErrors.email}</div>}

              <input name="phone" placeholder="Телефон"
                value={formData.phone} onChange={handleChange} />
              {fieldErrors.phone && <div className={styles.error}>{fieldErrors.phone}</div>}
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
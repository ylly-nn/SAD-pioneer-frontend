import { useNavigate } from "react-router-dom";
import styles from "./VerifiedPage.module.scss";
import backgroundImage from "../../../../assets/33.jpg";
import { useOrganizationData } from "../../../../hooks/useOrganizationData";

const VerifiedPage = () => {
  const navigate = useNavigate();
  const { org, branchesCount, loading } = useOrganizationData();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return <div className={styles.page}>Загрузка...</div>;
  }

  return (
    <div
      className={styles.page}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>PIONEER</h1>
          <p className={styles.subtitle}>
            организация<br />панель управления
          </p>
        </div>

        <div className={styles.orgInfo}>
          <h2 className={styles.orgName}>
            {org?.org_name || "Организация"}
          </h2>
          <div className={styles.orgContacts}>
            <span className={styles.orgEmail}>
              {branchesCount} филиалов
            </span>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Управление организацией
          </h2>

          <div className={styles.cards}>
            {/* Заказы */}
            <div className={styles.card}>
              <button
                onClick={() => handleNavigate("/organization/orders")}
                className={styles.cardButton}
                aria-label="Управление заказами"
              >
                <h3 className={styles.cardTitle}>Заказы</h3>
                <p className={styles.cardDescription}>
                  Просмотр и управление заказами, отслеживание статусов, история бронирований
                </p>
              </button>
            </div>

            {/* Филиалы */}
            <div className={styles.card}>
              <button
                onClick={() => handleNavigate("/organization/branches")}
                className={styles.cardButton}
                aria-label="Управление филиалами"
              >
                <h3 className={styles.cardTitle}>Филиалы</h3>
                <p className={styles.cardDescription}>
                  Управление филиалами, добавление новых, настройка расписания и услуг
                </p>
                </button>
            </div>

            {/* Пользователи */}
            <div className={styles.card}>
              <button
                onClick={() => handleNavigate("/organization/users")}
                className={styles.cardButton}
                aria-label="Управление пользователями"
              >
                <h3 className={styles.cardTitle}>
                  Добавить пользователя организации
                </h3>
                <p className={styles.cardDescription}>
                  Приглашение сотрудников, управление ролями и правами доступа
                </p>
              </button>
            </div>
          </div>
        </section>

        <div className={styles.footer}>
          <button
            className={styles.backButton}
            onClick={() => navigate("/")}
          >
            ← На главную
          </button>

          <button
            className={styles.settingsButton}
            onClick={() => handleNavigate("/organization/settings")}
          >
            ⚙️ Настройки
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifiedPage;
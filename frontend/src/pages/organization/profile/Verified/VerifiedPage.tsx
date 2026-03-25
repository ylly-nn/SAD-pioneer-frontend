import { useNavigate } from "react-router-dom";
import styles from "./VerifiedPage.module.scss";
import backgroundImage from "../../../../assets/33.jpg";

const VerifiedPage = () => {
  const navigate = useNavigate();

  // Временные данные организации
  const organization = {
    name: "какой-то авто сервис",
    email: "info@pioneer-auto.ru",
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

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
          <h2 className={styles.orgName}>{organization.name}</h2>
          <div className={styles.orgContacts}>
            <span className={styles.orgEmail}>{organization.email}</span>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Управление организацией</h2>
          
          <div className={styles.cards}>
            {/* Карточка Заказы */}
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
                <div className={styles.cardStats}>
                  <span className={styles.stat}>
                    <strong>2</strong> активных
                  </span>
                  <span className={styles.stat}>
                    <strong>4</strong> завершено
                  </span>
                </div>
              </button>
            </div>

            {/* Карточка Филиалы */}
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
                <div className={styles.cardStats}>
                  <span className={styles.stat}>
                    <strong>4</strong> филиала
                  </span>
                </div>
              </button>
            </div>

            {/* Карточка Пользователи организации */}
            <div className={styles.card}>
              <button
                onClick={() => handleNavigate("/organization/users")}
                className={styles.cardButton}
                aria-label="Управление пользователями"
              >
                <h3 className={styles.cardTitle}>Добавить пользователя организации</h3>
                <p className={styles.cardDescription}>
                  Приглашение сотрудников, управление ролями и правами доступа
                </p>
                <div className={styles.cardStats}>
                  <span className={styles.stat}>
                    <strong>8</strong> сотрудников
                  </span>
                </div>
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
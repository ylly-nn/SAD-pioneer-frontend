// AdminDashboardPage.tsx
import { Link } from "react-router-dom";
import styles from "./AdminDashboardPage.module.scss";

const AdminDashboardPage = () => {
  const menuItems = [
    {
      to: "/partners-requests",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 12H18L15 21L9 3L6 12H2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Заявки на подключение партнеров",
      description: "Просмотр и обработка заявок от новых партнеров"
    },
    {
      to: "/organizations",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9L12 3L21 9V20H3V9Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 20V14H15V20" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Управление организациями",
      description: "Добавление, редактирование и удаление организаций"
    },
    {
      to: "/client-requests",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.5 20C5.5 16 8.5 14 12 14C15.5 14 18.5 16 18.5 20" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Заявки клиентов",
      description: "Обработка заявок от клиентов на услуги"
    },
    {
      to: "/services",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2V4M12 20V22M4 12H2M6.5 6.5L5 5M17.5 6.5L19 5M6.5 17.5L5 19M17.5 17.5L19 19" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="4"/>
        </svg>
      ),
      title: "Управление услугами",
      description: "Настройка услуг, цен и времени выполнения"
    }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Админ. панель</h1>
        </div>

        <div className={styles.grid}>
          {menuItems.map((item) => (
            <Link key={item.to} to={item.to} className={styles.card}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardDescription}>{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
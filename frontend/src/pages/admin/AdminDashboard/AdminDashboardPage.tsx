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
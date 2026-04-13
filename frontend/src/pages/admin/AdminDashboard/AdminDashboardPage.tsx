import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboardPage.module.scss";
import { usePageToast } from "../../../hooks/usePageToast";

const AdminDashboardPage = () => {
  usePageToast();
  const navigate = useNavigate();
  
  const menuItems = [
    {
      path: "/admin/requests",
      icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 12H18L15 21L9 3L6 12H2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>),
      title: "Заявки на подключение",
      description: "Просмотр и обработка заявок от новых партнеров"
    },
    {
    path: "/admin/add-admin",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
        <circle cx="12" cy="7" r="4"/>
        <line x1="19" y1="2" x2="19" y2="6"/>
        <line x1="17" y1="4" x2="21" y2="4"/>
    </svg>
  ),
  title: "Добавить админа",
  description: "Добавление админа"
  },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Админ панель</h1>
        </div>

        <div className={styles.grid}>
          {menuItems.map((item) => (
            <div 
              key={item.path} 
              className={styles.card}
              onClick={() => navigate(item.path)}
            >
              <div className={styles.cardIcon}>{item.icon}</div>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
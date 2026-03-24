// AdminRequestsPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminRequestsPage.module.scss";

interface Request {
  id: string;
  title: string;
  details: string;
  status: "pending" | "in_progress" | "approved" | "rejected";
  date: string;
}

const AdminRequestsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "pending" | "in_progress" | "approved" | "rejected">("all");

  // Моковые данные заявок с 4 статусами
  const requests: Request[] = [
    { id: "1", title: "ООО Мойка", details: "Иванов Иван, тел: +7 999 123-45-67", status: "pending", date: "2024-03-20" },
    { id: "2", title: "Шиномонтаж Профи", details: "Петров Петр, тел: +7 999 234-56-78", status: "in_progress", date: "2024-03-19" },
    { id: "3", title: "Автоцентр", details: "Сидоров Сидор, тел: +7 999 345-67-89", status: "rejected", date: "2024-03-18" },
    { id: "4", title: "Мойка №1", details: "Кузнецова Анна, тел: +7 999 456-78-90", status: "pending", date: "2024-03-17" },
    { id: "5", title: "Шины 24/7", details: "Смирнов Алексей, тел: +7 999 567-89-01", status: "in_progress", date: "2024-03-16" },
    { id: "6", title: "Автомойка Люкс", details: "Козлова Мария, тел: +7 999 678-90-12", status: "approved", date: "2024-03-15" },
  ];

  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(r => r.status === filter);

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Новая заявка";
      case "in_progress": return "В работе";
      case "approved": return "Принята";
      case "rejected": return "Отклонена";
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending": return styles.statusPending;
      case "in_progress": return styles.statusInProgress;
      case "approved": return styles.statusApproved;
      case "rejected": return styles.statusRejected;
      default: return "";
    }
  };

  const handleViewRequest = (id: string) => {
    navigate(`/admin/requests/${id}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Заявки партнеров</h1>
          <button className={styles.backButton} onClick={() => navigate("/admin")}>
            ← Назад
          </button>
        </div>

        <div className={styles.filterSection}>
          <p className={styles.filterTitle}>Фильтр по статусу</p>
          <div className={styles.filterButtons}>
            <button 
              className={`${styles.filterButton} ${filter === "all" ? styles.active : ""}`}
              onClick={() => setFilter("all")}
            >
              Все
            </button>
            <button 
              className={`${styles.filterButton} ${filter === "pending" ? styles.active : ""}`}
              onClick={() => setFilter("pending")}
            >
              Новые
            </button>
            <button 
              className={`${styles.filterButton} ${filter === "in_progress" ? styles.active : ""}`}
              onClick={() => setFilter("in_progress")}
            >
              В работе
            </button>
            <button 
              className={`${styles.filterButton} ${filter === "approved" ? styles.active : ""}`}
              onClick={() => setFilter("approved")}
            >
              Принятые
            </button>
            <button 
              className={`${styles.filterButton} ${filter === "rejected" ? styles.active : ""}`}
              onClick={() => setFilter("rejected")}
            >
              Отклоненные
            </button>
          </div>
        </div>

        <div className={styles.requestsList}>
          {filteredRequests.map((request) => (
            <div key={request.id} className={styles.requestItem}>
              <div className={styles.requestInfo}>
                <h3 className={styles.requestTitle}>{request.title}</h3>
                <p className={styles.requestDetails}>{request.details}</p>
                <p className={styles.requestDate}>Дата: {request.date}</p>
              </div>
              <div className={`${styles.requestStatus} ${getStatusClass(request.status)}`}>
                {getStatusText(request.status)}
              </div>
              <button 
                className={styles.viewButton}
                onClick={() => handleViewRequest(request.id)}
              >
                Просмотр
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRequestsPage;
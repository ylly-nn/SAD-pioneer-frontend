//очень криво работает фильтр по заявкам = белый экран
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminRequestsPage.module.scss";
import { useAdminRequests } from "../../../hooks/adminHooks/useAdminRequests";
import type { RequestStatus } from "../../../types/admin";

const AdminRequestsPage = () => {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  
  const {
    requests,
    status,
    loading,
    error,
    changeStatus,
    takeRequest,
    approveRequest,
    rejectRequest,
  } = useAdminRequests('all');

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "Новая заявка";
      case "pending": return "В работе";
      case "approved": return "Принята";
      case "rejected": return "Отклонена";
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "new": return styles.statusPending;
      case "pending": return styles.statusInProgress;
      case "approved": return styles.statusApproved;
      case "rejected": return styles.statusRejected;
      default: return "";
    }
  };

  const handleViewRequest = (inn: string) => {
    navigate(`/admin/requests/${inn}`);
  };

  const handleTakeRequest = async (inn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Взять заявку в работу?')) {
      try {
        await takeRequest(inn);
        alert('Заявка взята в работу');
      } catch (err) {
        alert('Ошибка при взятии заявки');
      }
    }
  };

  const handleApproveRequest = async (inn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Одобрить заявку? Будет создана организация и пользователь.')) {
      try {
        await approveRequest(inn);
        alert('Заявка одобрена');
      } catch (err) {
        alert('Ошибка при одобрении заявки');
      }
    }
  };

  const handleRejectRequest = async (inn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Отклонить заявку?')) {
      try {
        await rejectRequest(inn);
        alert('Заявка отклонена');
      } catch (err) {
        alert('Ошибка при отклонении заявки');
      }
    }
  };

  const renderActionButtons = (request: any) => {
    if (request.status === 'new') {
      return (
        <button 
          className={styles.actionButton}
          onClick={(e) => handleTakeRequest(request.inn, e)}
        >
          Взять в работу
        </button>
      );
    }
    
    if (request.status === 'pending') {
      return (
        <div className={styles.actionGroup}>
          <button 
            className={`${styles.actionButton} ${styles.approveButton}`}
            onClick={(e) => handleApproveRequest(request.inn, e)}
          >
            Одобрить
          </button>
          <button 
            className={`${styles.actionButton} ${styles.rejectButton}`}
            onClick={(e) => handleRejectRequest(request.inn, e)}
          >
            Отклонить
          </button>
        </div>
      );
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loader}>Загрузка...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.error}>{error}</div>
          <button onClick={() => window.location.reload()}>Повторить</button>
        </div>
      </div>
    );
  }

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
            {(['all', 'new', 'pending', 'approved', 'rejected'] as const).map((filterStatus) => (
              <button 
                key={filterStatus}
                className={`${styles.filterButton} ${status === filterStatus ? styles.active : ""}`}
                onClick={() => changeStatus(filterStatus)}
              >
                {filterStatus === 'all' && 'Все'}
                {filterStatus === 'new' && 'Новые'}
                {filterStatus === 'pending' && 'В работе'}
                {filterStatus === 'approved' && 'Принятые'}
                {filterStatus === 'rejected' && 'Отклоненные'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.requestsList}>
          {requests.length === 0 ? (
            <div className={styles.emptyState}>Нет заявок</div>
          ) : (
            requests.map((request) => (
              <div key={request.inn} className={styles.requestItem}>
                <div className={styles.requestInfo}>
                  <h3 className={styles.requestTitle}>{request.org_name}</h3>
                  <p className={styles.requestDetails}>
                    {request.surname} {request.name} {request.patronymic}, 
                    тел: {request.phone}, email: {request.email}
                  </p>
                  <p className={styles.requestDetails}>ИНН: {request.inn}</p>
                  {request.info && (
                    <p className={styles.requestDetails}>Доп. информация: {request.info}</p>
                  )}
                </div>
                <div className={`${styles.requestStatus} ${getStatusClass(request.status)}`}>
                  {getStatusText(request.status)}
                </div>
                <div className={styles.actions}>
                  {renderActionButtons(request)}
                  <button 
                    className={styles.viewButton}
                    onClick={() => handleViewRequest(request.inn)}
                  >
                    Просмотр
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRequestsPage;
import { useState, useEffect } from "react";
import { useAdminRequests } from "../../../hooks/adminHooks/useAdminRequests";
import styles from "./AdminRequestsPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "../../../hooks/useNavigation";
import { useOrderStatus } from "../../../hooks/useOrderStatus";
import ConfirmModal from "../../../components/modals/ConfirmModal";

const AdminRequestsPage = () => {
  const { getStatusStyle, getStatusLabel } = useOrderStatus();
  const { goToAdmin } = useNavigation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const { requests, loading, error, changeRequestStatus } =
    useAdminRequests(activeFilter);

  const safeRequests = (requests || []).slice().sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const [allRequests, setAllRequests] = useState<any[]>([]);

  useEffect(() => {
    if (activeFilter === "all" && requests) {
      setAllRequests(requests);
    }
  }, [requests, activeFilter]);

  const handleStatusChange = async (
    id: string,
    newStatus: "pending" | "approved" | "rejected",
  ) => {
    try {
      await changeRequestStatus(id, newStatus);

      setAllRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
      );
    } catch (err) {
      console.error("Failed to change status:", err);
      alert("Ошибка при изменении статуса");
    }
  };

  const getCountByStatus = (status: string) => {
    if (status === "all") {
      return allRequests.length;
    }
    return allRequests.filter((r) => r.status === status).length;
  };

  const [modalData, setModalData] = useState<{
    id: string;
    action: "pending" | "approved" | "rejected";
  } | null>(null);

  const getModalText = (action: "pending" | "approved" | "rejected") => {
    switch (action) {
      case "pending":
        return "Вы точно хотите взять эту заявку в работу?";
      case "approved":
        return "Вы точно хотите одобрить эту заявку?";
      case "rejected":
        return "Вы точно хотите отклонить эту заявку?";
    }
  };

  if (loading) return <div className={styles.loader}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.container}>
      {/* шапка */}
      <div className={styles.header}>
        <button className={styles.toggleModalButton} onClick={goToAdmin}>
          <span>❮</span>
        </button>

        <h1>Заявки партнеров</h1>
      </div>

      <div className={styles.filters}>
        <button
          className={activeFilter === "all" ? styles.active : ""}
          onClick={() => setActiveFilter("all")}
        >
          Все ({getCountByStatus("all")})
        </button>
        <button
          className={activeFilter === "new" ? styles.active : ""}
          onClick={() => setActiveFilter("new")}
        >
          Новые ({getCountByStatus("new")})
        </button>
        <button
          className={activeFilter === "pending" ? styles.active : ""}
          onClick={() => setActiveFilter("pending")}
        >
          В работе ({getCountByStatus("pending")})
        </button>
        <button
          className={activeFilter === "approved" ? styles.active : ""}
          onClick={() => setActiveFilter("approved")}
        >
          Одобренные ({getCountByStatus("approved")})
        </button>
        <button
          className={activeFilter === "rejected" ? styles.active : ""}
          onClick={() => setActiveFilter("rejected")}
        >
          Отклоненные ({getCountByStatus("rejected")})
        </button>
      </div>

      {safeRequests.length === 0 ? (
        <div className={styles.emptyState}>Нет заявок</div>
      ) : (
        <div className={styles.cardsGrid}>
          {safeRequests.map((request) => (
            <div
              key={request.id}
              className={`${styles.card} ${
                request.status === "approved" || request.status === "rejected"
                  ? styles.fadedCard
                  : ""
              }`}
            >
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.orgName}>{request.org_name}</div>
                  <div className={styles.orgShort}>
                    {request.org_short_name}
                  </div>
                </div>

                <div
                  className={styles.statusBadge}
                  style={getStatusStyle(request.status)}
                >
                  {getStatusLabel(request.status)}
                </div>
              </div>

              {/* инфаормация */}
              <div className={styles.cardBody}>
                <div>
                  <b>ИНН:</b> {request.inn}
                </div>

                <div>
                  <b>Контакт:</b>{" "}
                  {`${request.surname} ${request.name} ${request.patronymic}`}
                </div>

                <div>
                  <b>Email:</b> {request.email}
                </div>

                <div>
                  <b>Телефон:</b> {request.phone}
                </div>

                <div className={styles.date}>
                  {new Date(request.created_at).toLocaleString()}
                </div>
              </div>

              {/* действия */}
              <div className={styles.cardActions}>
                {request.status === "new" && (
                  <button
                    className={styles.takeButton}
                    onClick={() =>
                      setModalData({ id: request.id, action: "pending" })
                    }
                  >
                    В работу
                  </button>
                )}

                {request.status === "pending" && (
                  <>
                    <button
                      className={styles.approveButton}
                      onClick={() =>
                        setModalData({ id: request.id, action: "approved" })
                      }
                    >
                      Одобрить
                    </button>

                    <button
                      className={styles.rejectButton}
                      onClick={() =>
                        setModalData({ id: request.id, action: "rejected" })
                      }
                    >
                      Отклонить
                    </button>
                  </>
                )}

                <button
                  className={styles.viewButton}
                  onClick={() =>
                    navigate(`/admin/form/${request.id}`, {
                      state: { formData: request },
                    })
                  }
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!modalData}
        text={modalData ? getModalText(modalData.action) : ""}
        onCancel={() => setModalData(null)}
        onConfirm={async () => {
          if (!modalData) return;

          await handleStatusChange(modalData.id, modalData.action);
          setModalData(null);
        }}
      />
    </div>
  );
};

export default AdminRequestsPage;

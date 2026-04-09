import { useState, useMemo } from "react";
import styles from "./OrganizationOrdersPage.module.scss";
import { useOrganizationOrder } from "../../../hooks/useOrganizationOrder";
import { useOrderStatus } from "../../../hooks/useOrderStatus";
import { useOrderActions } from "../../../hooks/useOrderActions";
import { useOrderFilters } from "../../../hooks/useOrderFilters";
import { useModal } from "../../../hooks/useModal";
import UserMenu from "../../../components/modals/UserMenu";
import { useNavigation } from "../../../hooks/useNavigation";
import ConfirmModal from "../../../components/modals/ConfirmModal";

const OrganizationOrdersPage = () => {
  const { goToOrganization } = useNavigation();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const {
    currentOrders,
    pastOrders,
    isLoading,
    error,
    updateOrderStatusLocal,
  } = useOrganizationOrder();

  const { getStatusStyle, getStatusLabel, canApprove, canReject, canCancel } =
    useOrderStatus();

  const {
    approve,
    reject,
    loadingId,
    error: actionError,
  } = useOrderActions(updateOrderStatusLocal);

  const [activeTab, setActiveTab] = useState<"current" | "past">("current");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const isPastTab = activeTab === "past";

  const orders = activeTab === "current" ? currentOrders : pastOrders;

  // филиалы
  const branches = useMemo(() => {
    const map = new Map();

    orders.forEach((o) => {
      const key = `${o.branch_city}-${o.branch_address}`;

      if (!map.has(key)) {
        map.set(key, {
          id: key,
          label: `${o.branch_city}, ${o.branch_address}`,
        });
      }
    });

    return Array.from(map.values());
  }, [orders]);

  const filteredOrders = useOrderFilters({
    orders,
    searchQuery,
    selectedStatus,
    selectedBranch,

    mapOrderToSearchStrings: (order) => [
      order.service,
      order.details,
      order.branch_city,
      order.branch_address,
      order.user || "",
    ],

    getStatus: (order) => order.status,

    getBranchKey: (order) => `${order.branch_city}-${order.branch_address}`,

    getDate: (order) => order.start_time,

    sortDirection,
  });

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const [modalData, setModalData] = useState<{
    id: string;
    action: "approve" | "reject" | "cancel";
    status: string;
  } | null>(null);

  const getModalText = (action: "approve" | "reject" | "cancel") => {
    switch (action) {
      case "approve":
        return "Вы точно хотите принять этот заказ?";
      case "reject":
        return "Вы точно хотите отклонить этот заказ?";
      case "cancel":
        return "Вы точно хотите отменить этот заказ?";
    }
  };

  if (isLoading) return <div className={styles.page}>Загрузка...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* шапка */}
        <div className={styles.header}>
          <div>
            <button
              className={styles.toggleModalButton}
              onClick={goToOrganization}
            >
              <span>❮</span>
            </button>

            <h1>Заказы</h1>
          </div>

          <button className={styles.toggleModalButton} onClick={toggleModal}>
            ☰
          </button>
        </div>

        {/* история*/}
        <div className={styles.tabs}>
          <button
            className={activeTab === "current" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("current")}
          >
            Текущие
          </button>

          <button
            className={activeTab === "past" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("past")}
          >
            История
          </button>
        </div>

        {/* действия */}

        <div className={styles.filtersBar}>
          <div className={styles.filtersLeft}>
            {/* поиск */}
            <input
              className={styles.searchInput}
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* селекты */}
            <select
              className={styles.filterSelect}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Все статусы</option>
              <option value="create">Новый</option>
              <option value="approve">Подтверждён</option>
              <option value="reject">Отклонён</option>
            </select>

            <select
              className={styles.filterSelect}
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="all">Все филиалы</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>

            <select
              className={styles.filterSelect}
              value={sortDirection}
              onChange={(e) =>
                setSortDirection(e.target.value as "asc" | "desc")
              }
            >
              <option value="desc">Сначала новые</option>
              <option value="asc">Сначала старые</option>
            </select>
          </div>

          <div className={styles.filtersRight}>
            {/* счетчик */}
            <div className={styles.totalOrders}>
              <span>Всего:</span>
              <span>{orders.length}</span>
            </div>
          </div>
          {/* кнопка */}
        </div>

        {(error || actionError) && (
          <div className={styles.errorMessage}>{error || actionError}</div>
        )}

        {/* наполнение */}
        <div className={styles.main}>
          {filteredOrders.length > 0 ? (
            <div className={styles.cardGrid}>
              {filteredOrders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <span className={styles.branchInfo}>
                      {order.branch_city}, {order.branch_address}
                    </span>

                    <div
                      className={styles.statusBadge}
                      style={getStatusStyle(order.status)}
                    >
                      {getStatusLabel(order.status)}
                    </div>
                  </div>

                  <div className={styles.orderService}>
                    <h3>{order.service}</h3>
                    <p>{order.details}</p>
                  </div>

                  <div className={styles.orderInfo}>
                    <span>
                      {formatDateTime(order.start_time)} -{" "}
                      {formatDateTime(order.end_time).split(" ")[1]}
                    </span>
                  </div>

                  <div className={styles.orderUser}>Клиент: {order.user}</div>

                  {!isPastTab && (
                    <div className={styles.orderActions}>
                      {canApprove(order.status) && (
                        <button
                          className={styles.approveBtn}
                          disabled={loadingId === order.id}
                          onClick={() =>
                            setModalData({
                              id: order.id,
                              action: "approve",
                              status: order.status,
                            })
                          }
                        >
                          Принять
                        </button>
                      )}

                      {canReject(order.status) && (
                        <button
                          className={styles.rejectBtn}
                          disabled={loadingId === order.id}
                          onClick={() =>
                            setModalData({
                              id: order.id,
                              action: "reject",
                              status: order.status,
                            })
                          }
                        >
                          Отклонить
                        </button>
                      )}

                      {canCancel(order.status) && (
                        <button
                          className={styles.rejectBtn}
                          disabled={loadingId === order.id}
                          onClick={() =>
                            setModalData({
                              id: order.id,
                              action: "cancel",
                              status: order.status,
                            })
                          }
                        >
                          Отменить
                        </button>
                      )}
                    </div>
                  )}

                  <div className={styles.orderFooter}>
                    <span>{order.total_amount} ₽</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>Нет заказов</h3>
            </div>
          )}
        </div>
      </div>
      <UserMenu isOpen={isModalOpen} onClose={closeModal} variant="mixed" />
      <ConfirmModal
  isOpen={!!modalData}
  text={modalData ? getModalText(modalData.action) : ""}
  onCancel={() => setModalData(null)}
  onConfirm={async () => {
    if (!modalData) return;

    try {
      if (modalData.action === "approve") {
        await approve(modalData.id, modalData.status);
      }

      if (modalData.action === "reject") {
        await reject(modalData.id, modalData.status);
      }

      if (modalData.action === "cancel") {
        await reject(modalData.id, modalData.status);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setModalData(null);
    }
  }}
/>
    </div>
  );
};

export default OrganizationOrdersPage;

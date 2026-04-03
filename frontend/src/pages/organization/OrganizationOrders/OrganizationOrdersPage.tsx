import { useState, useMemo } from "react";
import styles from "./OrganizationOrdersPage.module.scss";
import { useOrganizationOrder } from "../../../hooks/useOrganizationOrder";
import { useOrderStatus } from "../../../hooks/useOrderStatus";
import { useOrderActions } from "../../../hooks/useOrderActions";
import { useModal } from "../../../hooks/useModal";
import UserMenu from "../../../components/modals/UserMenu";

const OrganizationOrdersPage = () => {
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

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.branch_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.branch_address
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (order.user || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || order.status === selectedStatus;

      const branchKey = `${order.branch_city}-${order.branch_address}`;
      const matchesBranch =
        selectedBranch === "all" || branchKey === selectedBranch;

      return matchesSearch && matchesStatus && matchesBranch;
    });
  }, [orders, searchQuery, selectedStatus, selectedBranch]);

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isLoading) return <div className={styles.page}>Загрузка...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* шапка */}
        <div className={styles.header}>
            <h1 className={styles.title}>Заказы</h1>
            <button className={styles.toggleModalButton} onClick={toggleModal}>
            ☰
          </button>
            
        </div>

        {/* переключатели */}
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

        {/* фильтры */}
        <div className={styles.filtersSection}>
          <input
            className={styles.searchInput}
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className={styles.filterSelect}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="create">Новая</option>
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

          <div className={styles.totalOrders}>
            <span>Всего:</span>
            <span>{orders.length}</span>
          </div>
        </div>

        {(error || actionError) && (
          <div className={styles.errorMessage}>{error || actionError}</div>
        )}

        {/* заказы */}
        <div className={styles.ordersList}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
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
                        onClick={() => approve(order.id, order.status)}
                      >
                        Принять
                      </button>
                    )}

                    {canReject(order.status) && (
                      <button
                        className={styles.rejectBtn}
                        disabled={loadingId === order.id}
                        onClick={() => reject(order.id, order.status)}
                      >
                        Отклонить
                      </button>
                    )}

                    {canCancel(order.status) && (
                      <button
                        className={styles.rejectBtn}
                        disabled={loadingId === order.id}
                        onClick={() => reject(order.id, order.status)}
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
            ))
          ) : (
            <div className={styles.emptyState}>
              <h3>Нет заказов</h3>
            </div>
          )}
        </div>
      </div>
      <UserMenu isOpen={isModalOpen} onClose={closeModal} variant="mixed" />
    </div>
  );
};

export default OrganizationOrdersPage;

import { useState } from "react";
import styles from "./ProfilePage.module.scss";
import { useNavigation } from "../../../hooks/useNavigation";
import { useModal } from "../../../hooks/useModal";
import { useUserProfile } from "../../../hooks/useUserProfile";
import { useOrderFilters } from "../../../hooks/useOrderFilters";
import UserMenu from "../../../components/modals/UserMenu";
import { useOrderStatus } from "../../../hooks/useOrderStatus";
import { usePageToast } from "../../../hooks/usePageToast";


const ProfilePage = () => {
  usePageToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { getStatusStyle, getStatusLabel } = useOrderStatus();
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const { goToSelectService, goToOrderDetails, goHome } = useNavigation();

  const { currentOrders, pastOrders, isLoading, formatDate } = useUserProfile();

  const [activeTab, setActiveTab] = useState<"current" | "past">("current");

  const ordersToShow = activeTab === "current" ? currentOrders : pastOrders;

  const filteredOrders = useOrderFilters({
    orders: ordersToShow,
    searchQuery,
    selectedStatus,

    mapOrderToSearchStrings: (order) => [
      order.service,
      order.name_company,
      order.city,
      order.address,
    ],

    getStatus: (order) => order.status,

    getDate: (order) => order.start_moment,

    sortDirection,
  });

  const isEmpty = filteredOrders.length === 0;

  if (isLoading) return <div className={styles.page}>Загрузка...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* шапка */}
        <div className={styles.header}>
          <div>
            <button className={styles.toggleModalButton} onClick={() => goHome()}>
              <span>❮</span>
            </button>

            <h1>Ваша страница</h1>
          </div>

          <div className={styles.menuContainer}>
            <button className={styles.toggleModalButton} onClick={toggleModal}>
              ☰
            </button>
            <UserMenu
              isOpen={isModalOpen}
              onClose={closeModal}
              variant="user"
            />
          </div>
        </div>

        {/* история*/}
        <div className={styles.tabs}>
          <button
            className={activeTab === "current" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("current")}
          >
            Записи
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
              <span>{filteredOrders.length}</span>
            </div>
            {/* кнопка */}
            <button
              className={styles.primaryButton}
              onClick={() => goToSelectService()}
            >
              + Новая запись
            </button>
          </div>
        </div>

        {/* наполнение */}
        <div className={styles.main}>
          {isEmpty ? (
            <div className={styles.emptyState}>
              <h3>
                {activeTab === "current"
                  ? "У вас пока нет записей"
                  : "История пока пуста"}
              </h3>

              {activeTab === "current" && (
                <button
                  className={styles.primaryButton}
                  onClick={() => goToSelectService()}
                >
                  Создать запись
                </button>
              )}
            </div>
          ) : (
            <div className={styles.cardsGrid}>
              {filteredOrders.map((order) => (
                <div
                  key={order.order_id}
                  className={styles.card}
                  onClick={() => goToOrderDetails(order)}
                >
                  <div className={styles.cardHeader}>
                    <h3>{order.service}</h3>

                    <div
                      className={styles.statusBadge}
                      style={getStatusStyle(order.status)}
                    >
                      {getStatusLabel(order.status)}
                    </div>
                  </div>

                  <div className={styles.cardCompany}>{order.name_company}</div>

                  <div className={styles.cardAddress}>
                    {order.city}, {order.address}
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.cardDate}>
                      {formatDate(order.start_moment)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

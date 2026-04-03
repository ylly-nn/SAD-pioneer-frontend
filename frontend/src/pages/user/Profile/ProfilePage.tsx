import { useState } from "react";
import styles from "./ProfilePage.module.scss";
import { useNavigation } from "../../../hooks/useNavigation";
import { useModal } from "../../../hooks/useModal";
import { useUserProfile } from "../../../hooks/useUserProfile";
import UserMenu from "../../../components/modals/UserMenu";
import { useOrderStatus } from "../../../hooks/useOrderStatus";

const ProfilePage = () => {
  const { getStatusStyle, getStatusLabel } = useOrderStatus();
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const { goToSelectService, goToOrderDetails } = useNavigation();

  const { currentOrders, pastOrders, isLoading, formatDate } = useUserProfile();

  const [activeTab, setActiveTab] = useState<"current" | "past">("current");

  if (isLoading) return <div className={styles.page}>Загрузка...</div>;

  const ordersToShow = activeTab === "current" ? currentOrders : pastOrders;

  const isEmpty = ordersToShow.length === 0;

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Ваша страница</h1>
          <button className={styles.toggleModalButton} onClick={toggleModal}>
            ☰
          </button>
        </div>

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

        <div className={styles.scrollableArea}>
          {isEmpty ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateContent}>
                <h2>
                  {activeTab === "current"
                    ? "У вас пока нет записей"
                    : "История пока пуста"}
                </h2>

                {activeTab === "current" && (
                  <>
                    <p>Оформите первую запись</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.innerScroll}>
              <div className={styles.appointmentsList}>
                {ordersToShow.map((order) => (
                  <div
                    key={order.order_id}
                    className={styles.appointmentCard}
                    onClick={() => goToOrderDetails(order)}
                  >
                    <div className={styles.orderHeader}>
                      <h3>{order.service}</h3>
                      <div
                      className={styles.statusBadge}
                      style={getStatusStyle(order.status)}
                      >
                        {getStatusLabel(order.status)}
                      </div>
                    </div>

                    <div className={styles.cardMeta}>
                      <span>{order.name_company}</span>
                    </div>

                    <div className={styles.cardMeta}>
                      <span>
                        {order.city}, {order.address}
                      </span>
                    </div>

                    <div className={styles.cardTime}>
                      {formatDate(order.start_moment)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.stickyFooter}>
          <button className={styles.primaryButton} onClick={goToSelectService}>
            + Новая запись
          </button>
        </div>
      </div>

      <UserMenu isOpen={isModalOpen} onClose={closeModal} variant="user" />
    </div>
  );
};

export default ProfilePage;
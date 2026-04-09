import styles from "./VerifiedPage.module.scss";
import backgroundImage from "../../../../assets/33.jpg";
import { useOrganizationData } from "../../../../hooks/useOrganizationData";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useModal } from "../../../../hooks/useModal";
import UserMenu from "../../../../components/modals/UserMenu";

const VerifiedPage = () => {
  const {
    goToOrganizationOrders,
    goToOrganizationBranches,
    goToOrganizationAddUser,
  } = useNavigation();

  const { org, branchesCount, loading } = useOrganizationData();
  const { isModalOpen, toggleModal, closeModal } = useModal();

  if (loading) {
    return <div className={styles.page}>Загрузка...</div>;
  }

  return (
    <div
      className={styles.page}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>PIONEER</h1>
            <p className={styles.subtitle}>
              организация
              <br />
              панель управления
            </p>
          </div>

          <div className={styles.menuContainer}>
            <button className={styles.toggleModalButton} onClick={toggleModal}>
              ☰
            </button>
            <UserMenu
              isOpen={isModalOpen}
              onClose={closeModal}
              variant="organization"
              theme="glass"
            />
          </div>
        </div>

        <div className={styles.orgInfo}>
          <h2 className={styles.orgName}>{org?.org_name || "Организация"}</h2>
          <div className={styles.orgContacts}>
            <span className={styles.orgEmail}>{branchesCount} филиалов</span>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Управление организацией</h2>

          <div className={styles.cards}>
            {/* Заказы */}
            <div className={styles.card}>
              <button
                onClick={goToOrganizationOrders}
                className={styles.cardButton}
                aria-label="Управление заказами"
              >
                <h3 className={styles.cardTitle}>Заказы</h3>
                <p className={styles.cardDescription}>
                  Просмотр и управление заказами, отслеживание статусов, история
                  бронирований
                </p>
              </button>
            </div>

            {/* Филиалы */}
            <div className={styles.card}>
              <button
                onClick={goToOrganizationBranches}
                className={styles.cardButton}
                aria-label="Управление филиалами"
              >
                <h3 className={styles.cardTitle}>Филиалы</h3>
                <p className={styles.cardDescription}>
                  Управление филиалами, добавление новых, настройка расписания и
                  услуг
                </p>
              </button>
            </div>

            {/* Пользователи */}
            <div className={styles.card}>
              <button
                onClick={goToOrganizationAddUser}
                className={styles.cardButton}
                aria-label="Управление пользователями"
              >
                <h3 className={styles.cardTitle}>Добавить пользователя</h3>
                <p className={styles.cardDescription}>
                  Приглашение сотрудников
                </p>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VerifiedPage;

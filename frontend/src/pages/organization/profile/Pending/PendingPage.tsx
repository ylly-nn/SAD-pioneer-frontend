import styles from "./PendingPage.module.scss";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useProfile } from "../../../../hooks/useOrganizationProfile";

import { useModal } from "../../../../hooks/useModal";
import UserMenu from "../../../../components/modals/UserMenu";

const PendingPage = () => {
  const { goToViewForm } = useNavigation();

  const {
    isModalOpen,
    toggleModal,
    closeModal,
  } = useModal();

  const {
    name,
    currentStatus,
  } = useProfile();


  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Страница организации</h1>

          <button
            className={styles.toggleModalButton}
            onClick={toggleModal}
          >
            ☰
          </button>
        </div>

        <div className={styles.scrollableArea}>
          <form className={styles.form}>
            <div className={styles.mainCard}>
              <div className={styles.statusIcon}>
                {currentStatus.icon}
              </div>

              <h2 className={styles.mainTitle}>
                {currentStatus.title}
              </h2>

              <p className={styles.mainText}>
                {currentStatus.text(name)}
              </p>

              <div className={styles.buttons}>
                <div className={styles.statusBadge}>
                  {currentStatus.badge}
                </div>

                <button
                  type="button"
                  className={styles.detailsButton}
                  onClick={goToViewForm}
                >
                  Посмотреть заявку
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

<UserMenu
  isOpen={isModalOpen}
  onClose={closeModal}
  variant="organization"
/>

    </div>
  );
};

export default PendingPage;
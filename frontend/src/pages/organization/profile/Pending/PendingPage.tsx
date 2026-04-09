import styles from "./PendingPage.module.scss";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useProfile } from "../../../../hooks/useOrganizationProfile";

import { useModal } from "../../../../hooks/useModal";
import UserMenu from "../../../../components/modals/UserMenu";

const PendingPage = () => {
  const { goToViewForm, goToCreateForm } = useNavigation();

  const { isModalOpen, toggleModal, closeModal } = useModal();

  const { name, currentStatus, currentStatusKey } = useProfile();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Страница организации</h1>

          <div className={styles.menuContainer}>
            <button className={styles.toggleModalButton} onClick={toggleModal}>
              ☰
            </button>
            <UserMenu
              isOpen={isModalOpen}
              onClose={closeModal}
              variant="organization"
            />
          </div>
        </div>

        <div className={styles.scrollableArea}>
          <form className={styles.form}>
            <div className={styles.mainCard}>
              <div className={styles.statusIcon}>{currentStatus.icon}</div>

              <h2 className={styles.mainTitle}>{currentStatus.title}</h2>

              <p className={styles.mainText}>{currentStatus.text(name)}</p>

              <div className={styles.buttons}>
                <button
                  type="button"
                  className={styles.detailsButton}
                  onClick={goToViewForm}
                >
                  Посмотреть заявку
                </button>
                {currentStatusKey === "rejected" && (
                  <button
                    type="button"
                    className={styles.detailsButton}
                    onClick={goToCreateForm}
                  >
                    Подать новую заявку
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;

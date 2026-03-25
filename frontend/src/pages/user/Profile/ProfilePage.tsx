import styles from "./ProfilePage.module.scss";

import { useNavigation } from "../../../hooks/useNavigation";
import { useLogout } from "../../../hooks/useLogout";

const ProfilePage = () => {
  const {
    goHome,
    goToSelectService,
  } = useNavigation();

  const { logout } = useLogout();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Страница пользователя</h1>
          <button className={styles.closeButton} onClick={goHome}>✕</button>
        </div>

        <div className={styles.scrollableArea}>
          <form className={styles.form}>
            <div className={styles.columns}>
              {/* организация */}
              <div className={styles.section}>
                <div className={styles.container}>
                  <h3>
                    <button onClick={logout}>Выйти</button>
                  </h3>
                </div>
              </div>

              {/* контакт */}
              <div className={styles.section}>
                <div className={styles.statusBlock}>
                  <p>Ваши записи:</p>
                  <button
                  className={styles.detailsButton}
                  onClick={goToSelectService}
                  type="button"
                  >
                    оформить новую запись
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import styles from "./HomePage.module.scss";
import backgroundImage from "../../assets/33.jpg";

import { isAuthenticated } from "../../api/tokenService";
import { useNavigation } from "../../hooks/useNavigation";
import { useModal } from "../../hooks/useModal";
import UserMenu from "../../components/modals/UserMenu";
import { usePageToast } from "../../hooks/usePageToast";

const HomePage = () => {
  usePageToast();
  const { goToUser, goToOrganization } = useNavigation();
  const { isModalOpen, toggleModal, closeModal } = useModal();

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
              предоставление услуг
              <br />
              транспортным средствам
            </p>
          </div>

          {isAuthenticated() && (
            <div className={styles.menuContainer}>
              <button
                className={styles.toggleModalButton}
                onClick={toggleModal}
              >
                ☰
              </button>
              <UserMenu
                isOpen={isModalOpen}
                onClose={closeModal}
                variant="home"
                theme="glass"
              />
            </div>
          )}
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Представьтесь, пожалуйста</h2>

          <ul className={styles.cards}>
            <li className={styles.card}>
              <button onClick={() => goToUser()} className={styles.cardButton}>
                <h3 className={styles.cardTitle}>Я владелец тс</h3>
                <p className={styles.cardDescription}>
                  Я ищу надёжных исполнителей, которые качественно выполняют
                  работу, используют хорошие материалы и не завышают цены
                </p>
              </button>
            </li>

            <li className={styles.card}>
              <button onClick={() => goToOrganization()} className={styles.cardButton}>
                <h3 className={styles.cardTitle}>Мы организация</h3>
                <p className={styles.cardDescription}>
                  Мы хотим чтобы потенциальные клиенты могли узнать о нас и
                  готовы предоставлять лучшие услуги.
                </p>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

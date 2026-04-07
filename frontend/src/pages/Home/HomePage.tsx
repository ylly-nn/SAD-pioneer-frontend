import styles from "./HomePage.module.scss";

import { useNavigation } from "../../hooks/useNavigation";

const HomePage = () => {
  const { goToUser, goToOrganization} = useNavigation();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>PIONEER</h1>
          <p className={styles.subtitle}>
            предоставление услуг<br />транспортным средствам
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Представьтесь, пожалуйста</h2>
          <ul className={styles.cards}>
            <li className={styles.card}>
              <button
              
                onClick={() => goToUser()}
                className={styles.cardButton}
                aria-label="Войти как владелец ТС"
              >
                <h3 className={styles.cardTitle}>Я владелец тс</h3>
                <p className={styles.cardDescription}>
                  Я ищу надёжных исполнителей, которые качественно выполняют работу, используют хорошие материалы и не завышают цены
                </p>
              </button>
            </li>

            <li className={styles.card}>
              <button
                onClick={() => goToOrganization()}
                className={styles.cardButton}
                aria-label="Войти как организация"
              >
                <h3 className={styles.cardTitle}>Мы организация</h3>
                <p className={styles.cardDescription}>
                  Мы хотим чтобы потенциальные клиенты могли узнать о нас и готовы предоставлять лучшие услуги.
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

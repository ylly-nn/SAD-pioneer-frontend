import styles from "./Header.module.scss";

interface HeaderProps {
  setIsLoginModalOpen: (value: boolean) => void;
  setIsBurgerModalOpen: (value: boolean) => void;
  handleHome: () => void;
}

const Header: React.FC<HeaderProps> = ({
  setIsLoginModalOpen,
  setIsBurgerModalOpen,
  handleHome,
}) => {
  return (
    <div className={styles.header}>
      {/* логотип */}
      <div className={styles.headerLogo} onClick={handleHome}>
        <img alt="логотип" className={styles.logoImage} />
      </div>

      {/* пользователь */}
      <div className={styles.user}>
        <div className={styles.userName}>
          {"гость"}
        </div>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className={styles.modalOpen}
        >
          <img alt="профиль" className={styles.modalOpenImage} />
        </button>

        <button
          onClick={() => setIsBurgerModalOpen(true)}
          className={styles.modalOpen}
        >
          <img alt="меню" className={styles.modalOpenImage} />
        </button>
      </div>
    </div>
  );
};

export default Header;

import styles from "./ProfilePage.module.scss";

import { useHandlesLogic } from "../../../hooks/handlesLogic";

const ProfilePage = () => {

    const {
    handleHome,
    handleSelectService,
  } = useHandlesLogic();

  return (
    <div className={styles.container}>
      Профиль пользователя

      <button onClick={handleHome}>
          дом
      </button>

    </div>
  );
};

export default ProfilePage;

import styles from "./ProfilePage.module.scss";

import { useHandlesLogic } from "../../../hooks/handlesLogic";
import { useLogout } from "../../../hooks/useLogout";

const ProfilePage = () => {

    const {
    handleHome,
    handleSelectService,
  } = useHandlesLogic();

  const { logout } = useLogout();

  return (
    <div className={styles.container}>
      Профиль пользователя

      <button onClick={handleHome}>
          дом
      </button>

      <button onClick={handleSelectService}>
          оформить новый заказ
      </button>

      

<button onClick={logout}>Выйти</button>

    </div>
  );
};

export default ProfilePage;

import styles from "./ConfirmPage.module.scss";

import { useHandlesLogic } from "../../../../hooks/handlesLogic";

const ConfirmPage = () => {

    const {
    handleHome

  } = useHandlesLogic();

  return (
    <div className={styles.container}>
      Подтверждение записи на услугу. для пользователя

      <button onClick={handleHome}>
          дом
      </button>
      
    </div>
  );
};

export default ConfirmPage;

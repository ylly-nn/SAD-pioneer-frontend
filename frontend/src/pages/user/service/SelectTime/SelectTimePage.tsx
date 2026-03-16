import styles from "./SelectTimePage.module.scss";

import { useHandlesLogic } from "../../../../hooks/handlesLogic";

const SelectTimePage = () => {

    const {
    handleHome,

  } = useHandlesLogic();

  return (
    <div className={styles.container}>
      Выбор времени записи. для пользователя

      <button onClick={handleHome}>
          дом
      </button>
      
    </div>
  );
};

export default SelectTimePage;

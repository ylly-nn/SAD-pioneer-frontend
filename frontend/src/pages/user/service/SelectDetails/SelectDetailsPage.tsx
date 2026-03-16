import styles from "./SelectDetailsPage.module.scss";

import { useHandlesLogic } from "../../../../hooks/handlesLogic";

const SelectDetailsPage = () => {

    const {
    handleHome

  } = useHandlesLogic();

  return (
    <div className={styles.container}>
      Уточнение услуги. для пользователя

      <button onClick={handleHome}>
          дом
      </button>
      
    </div>
  );
};

export default SelectDetailsPage;

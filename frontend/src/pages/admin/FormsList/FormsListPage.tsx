import styles from "./FormsListPage.module.scss";

import { useHandlesLogic } from "../../../hooks/handlesLogic";

const FormsListPage = () => {

    const {
      handleHome
  
    } = useHandlesLogic();

  return (
    <div className={styles.container}>
      Список форм. Для админа

      <button onClick={handleHome}>
          дом
      </button>
      
    </div>
  );
};

export default FormsListPage;

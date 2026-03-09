import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

import { useHandlesLogic } from "../../hooks/handlesLogic";

const NotFoundPage = () => {

  const {
    handleHome,
    handleUserLogin,
    handleUserRegister,
    handleSelectService,
    handleSelectOrganization,
    handleSelectDetails,
    handleSelectTime,
    handleConfirmBooking,

    handleOrganizationLogin,
    handleOrganizationRegister,
    handleViewForm,

    handleAdminFormView,
    handleAdminFormList,

  } = useHandlesLogic();

  return (
    <div className={styles.container}>

      


      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>страница не найдена</p>
        <p className={styles.text}>
          возможно, она была удалена или вы ввели неверный адрес
        </p>
        <button onClick={handleHome}>
          вернуться на главную
      </button>
      </div>
    </div>
  );
};

export default NotFoundPage;

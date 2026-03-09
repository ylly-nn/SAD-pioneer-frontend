import styles from "./ConfirmPage.module.scss";

import { useHandlesLogic } from "../../../../hooks/handlesLogic";

const ConfirmPage = () => {

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
      Подтверждение записи на услугу. для пользователя

      <button onClick={handleHome}>
          дом
      </button>
      
    </div>
  );
};

export default ConfirmPage;

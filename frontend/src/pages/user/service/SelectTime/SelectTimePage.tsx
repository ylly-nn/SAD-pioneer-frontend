import styles from "./SelectTimePage.module.scss";

import { useHandlesLogic } from "../../../../hooks/handlesLogic";

const SelectTimePage = () => {

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
      Выбор времени записи. для пользователя

      <button onClick={handleHome}>
          дом
      </button>
      
    </div>
  );
};

export default SelectTimePage;

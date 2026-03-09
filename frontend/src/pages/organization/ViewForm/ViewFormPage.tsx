import styles from "./ViewFormPage.module.scss";

import { useHandlesLogic } from "../../../hooks/handlesLogic";

const ViewFormPage = () => {

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
      Просмотр формы для организации

      <button onClick={handleHome}>
          дом
      </button>
      
    </div>
  );
};

export default ViewFormPage;

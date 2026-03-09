import styles from "./SelectDetailsPage.module.scss";

import { useHandlesLogic } from "../../../../hooks/handlesLogic";

const SelectDetailsPage = () => {

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
      Уточнение услуги. для пользователя

      <button onClick={handleHome}>
          дом
      </button>
      
    </div>
  );
};

export default SelectDetailsPage;

import styles from "./FormsListPage.module.scss";

import { useHandlesLogic } from "../../../hooks/handlesLogic";

const FormsListPage = () => {

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
      Список форм. Для админа

      <button onClick={handleHome}>
          дом
      </button>
      
    </div>
  );
};

export default FormsListPage;

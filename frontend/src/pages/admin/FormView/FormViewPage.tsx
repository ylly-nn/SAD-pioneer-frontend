import styles from "./FormViewPage.module.scss";

import { useHandlesLogic } from "../../../hooks/handlesLogic";

const FormViewPage = () => {

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
      Просмотр формы. Для админа

      <button onClick={handleHome}>
          дом
      </button>

    </div>
  );
};

export default FormViewPage;

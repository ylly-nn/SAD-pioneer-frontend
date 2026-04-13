import { useProfile } from "../../../hooks/useOrganizationProfileAAAA";

import EmptyPage from "./Empty/EmptyPage";
import PendingPage from "./Pending/PendingPage";
import VerifiedPage from "./Verified/VerifiedPage";
import { usePageToast } from "../../../hooks/usePageToast";


const ProfilePage = () => {
  usePageToast();
  const { isLoading, profileStatus } = useProfile();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  switch (profileStatus) {
    case "Verified":
      return <VerifiedPage />;
    case "Pending":
      return <PendingPage />;
    case "Empty":
      return <EmptyPage />;
    default:
      console.error("Не удалось получить данные о вашем аккаунте");
      return <div>Произошла ошибка. Пожалуйста, перезагрузите страницу.</div>;
  }



  /*var a = "aaa"

  switch (a) {
    case "a":
      return <VerifiedPage />;
    case "aa":
      return <PendingPage />;
    case "aaa":
      return <EmptyPage />;
    default:
      console.error("Не удалось получить данные о вашем аккаунте");
      return <div>Произошла ошибка. Пожалуйста, перезагрузите страницу.</div>;
  }*/
};

export default ProfilePage;
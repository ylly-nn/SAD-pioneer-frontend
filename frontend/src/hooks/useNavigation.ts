import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate("/"),

    // владельцы тс
    goToUser: () => navigate(ROUTES.USER.Profile),
    goToUserLogin: () => navigate(ROUTES.USER.LOGIN),
    goToUserRegister: () => navigate(ROUTES.USER.REGISTER),
    goToUserVerify: () => navigate(ROUTES.USER.Verify),
    goToSelectService: () => navigate(ROUTES.USER.SERVICE.SELECT),
    goToSelectOrganization: () => navigate(ROUTES.USER.SERVICE.ORGANIZATION),
    goToSelectTime: () => navigate(ROUTES.USER.SERVICE.TIME),
    goToConfirmBooking: () => navigate(ROUTES.USER.SERVICE.CONFIRM),

    // организации
    goToOrganizationLogin: () => navigate(ROUTES.ORGANIZATION.LOGIN),
    goToOrganizationRegister: () => navigate(ROUTES.ORGANIZATION.REGISTER),
    goToViewForm: () => navigate(ROUTES.ORGANIZATION.VIEW_FORM),

    // администраторы
    goToAdminForms: () => navigate(ROUTES.ADMIN.FORMS),
    goToAdminFormDetail: () => navigate(ROUTES.ADMIN.FORM_DETAIL),
  };
};
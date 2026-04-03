import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { generatePath } from "react-router-dom";
import { type UserOrder } from "../types/orders";

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate("/"),
    goBack: () => navigate(-1),

    // владельцы тс
    goToUser: () => navigate(ROUTES.USER.PROFILE),

    goToUserLogin: () => navigate(ROUTES.USER.LOGIN),
    goToUserRegister: () => navigate(ROUTES.USER.REGISTER),
    goToUserVerify: () => navigate(ROUTES.USER.VERIFY),

    goToSelectService: () => navigate(ROUTES.USER.SERVICE.SELECT),
    goToSelectOrganization: () => navigate(ROUTES.USER.SERVICE.ORGANIZATION),
    goToSelectDetails: () => navigate(ROUTES.USER.SERVICE.DETAILS),
    goToSelectTime: () => navigate(ROUTES.USER.SERVICE.TIME),
    goToConfirmBooking: () => navigate(ROUTES.USER.SERVICE.CONFIRM),

    goToOrderDetails: (order: UserOrder) =>
      navigate(`${ROUTES.USER.ORDER}/${order.order_id}`, {
        state: { order },
      }),

    // организации
    goToOrganization: () => navigate(ROUTES.ORGANIZATION.PROFILE),

    goToOrganizationLogin: () => navigate(ROUTES.ORGANIZATION.LOGIN),
    goToOrganizationRegister: () => navigate(ROUTES.ORGANIZATION.REGISTER),

    goToCreateForm: () => navigate(ROUTES.ORGANIZATION.EDIT_FORM),
    goToViewForm: () => navigate(ROUTES.ORGANIZATION.VIEW_FORM),

    goToOrganizationOrders: () => navigate(ROUTES.ORGANIZATION.ORDERS),

    goToOrganizationBranches: () => navigate(ROUTES.ORGANIZATION.BRANCH.ALL),
    goToOrganizationAddBranch: () => navigate(ROUTES.ORGANIZATION.BRANCH.FORM),
    goToOrganizationBranch: (id: string) =>
      navigate(`${ROUTES.ORGANIZATION.BRANCH.PROFILE}/${id}`),

    goToOrganizationAddService: (id: string) =>
      navigate(generatePath(ROUTES.ORGANIZATION.BRANCH.SERVICE.ADD, { id })),
    goToOrganizationAddServiceDetail: (id: string, serviceId: string) =>
      navigate(
        generatePath(ROUTES.ORGANIZATION.BRANCH.SERVICE.DETAIL, {
          id,
          serviceId,
        }),
      ),

    goToOrganizationAddUser: () => navigate(ROUTES.ORGANIZATION.USERS.FORM),

    // администраторы
    goToAdminFormDetail: () => navigate(ROUTES.ADMIN.FORM_DETAIL),
  };
};

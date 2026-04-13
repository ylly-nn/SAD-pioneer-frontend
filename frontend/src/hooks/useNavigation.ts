import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { generatePath } from "react-router-dom";
import { type UserOrder } from "../types/orders";
import { type Role } from "../types/auth";
import { roleService } from "../services/roleService";

type ToastType = "success" | "error" | "info";

interface NavOptions {
  message?: string;
  type?: ToastType;
}

export const useNavigation = () => {
  const navigate = useNavigate();

  const withState = (options?: NavOptions) =>
    options
      ? {
          state: {
            toast: {
              message: options.message,
              type: options.type || "info",
            },
          },
        }
      : {};

  return {
    goHome: (opt?: NavOptions) => navigate("/", withState(opt)),
    goBack: () => navigate(-1),

    goToLogin: (role: Role, opt?: NavOptions) => {
      roleService.setRole(role);
      navigate("/login", withState(opt));
    },

    goToRegister: (role: Role, opt?: NavOptions) => {
      roleService.setRole(role);
      navigate("/register", withState(opt));
    },

    goToProfile: (opt?: NavOptions) => {
      const role = roleService.getRole();

      if (role === "organization") {
        navigate(ROUTES.ORGANIZATION.PROFILE, withState(opt));
      } else {
        navigate(ROUTES.USER.PROFILE, withState(opt));
      }
    },

    // владельцы тс
    goToUser: (opt?: NavOptions) => {
      roleService.setRole("user");
      navigate(ROUTES.USER.PROFILE, withState(opt));
    },

    goToSelectService: (opt?: NavOptions) =>
      navigate(ROUTES.USER.SERVICE.SELECT, withState(opt)),
    goToSelectOrganization: (opt?: NavOptions) =>
      navigate(ROUTES.USER.SERVICE.ORGANIZATION, withState(opt)),
    goToSelectDetails: (opt?: NavOptions) =>
      navigate(ROUTES.USER.SERVICE.DETAILS, withState(opt)),
    goToSelectTime: (opt?: NavOptions) =>
      navigate(ROUTES.USER.SERVICE.TIME, withState(opt)),
    goToConfirmBooking: (opt?: NavOptions) =>
      navigate(ROUTES.USER.SERVICE.CONFIRM, withState(opt)),

    goToOrderDetails: (order: UserOrder, opt?: NavOptions) =>
      navigate(`${ROUTES.USER.ORDER}/${order.order_id}`, {
        state: { order, ...withState(opt).state },
      }),

    // организации
    goToOrganization: (opt?: NavOptions) => {
      roleService.setRole("organization");
      navigate(ROUTES.ORGANIZATION.PROFILE, withState(opt));
    },

    goToCreateForm: (opt?: NavOptions) =>
      navigate(ROUTES.ORGANIZATION.EDIT_FORM, withState(opt)),
    goToViewForm: (opt?: NavOptions) =>
      navigate(ROUTES.ORGANIZATION.VIEW_FORM, withState(opt)),

    goToOrganizationOrders: (opt?: NavOptions) =>
      navigate(ROUTES.ORGANIZATION.ORDERS, withState(opt)),

    goToOrganizationBranches: (opt?: NavOptions) =>
      navigate(ROUTES.ORGANIZATION.BRANCH.ALL, withState(opt)),
    goToOrganizationAddBranch: (opt?: NavOptions) =>
      navigate(ROUTES.ORGANIZATION.BRANCH.FORM, withState(opt)),
    goToOrganizationBranch: (id: string, opt?: NavOptions) =>
      navigate(`${ROUTES.ORGANIZATION.BRANCH.PROFILE}/${id}`, withState(opt)),

    goToOrganizationAddService: (id: string, opt?: NavOptions) =>
      navigate(
        generatePath(ROUTES.ORGANIZATION.BRANCH.SERVICE.ADD, { id }),
        withState(opt),
      ),
    goToOrganizationAddServiceDetail: (
      id: string,
      serviceId: string,
      opt?: NavOptions,
    ) =>
      navigate(
        generatePath(ROUTES.ORGANIZATION.BRANCH.SERVICE.DETAIL, {
          id,
          serviceId,
        }),
        withState(opt),
      ),

    goToOrganizationAddUser: (opt?: NavOptions) =>
      navigate(ROUTES.ORGANIZATION.USERS.FORM, withState(opt)),

    // администраторы
    goToAdmin: (opt?: NavOptions) =>
      navigate(ROUTES.ADMIN.PROFILE, withState(opt)),
    goToAdminFormDetail: (opt?: NavOptions) =>
      navigate(ROUTES.ADMIN.FORM_DETAIL, withState(opt)),
  };
};

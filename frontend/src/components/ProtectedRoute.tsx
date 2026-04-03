import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/tokenService";
import { ROUTES } from "../constants/routes";

import { useProfile } from "../hooks/useOrganizationProfileAAAA";
import { useLocation } from "react-router-dom";
import type { Location as RouterLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const redirectToLogin = (location: RouterLocation) => (
  <Navigate
    to={ROUTES.LOGIN}
    state={{ from: location.pathname + location.search }}
    replace
  />
);

// необходима только авторизация
export const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return redirectToLogin(location);
  }

  return <>{children}</>;
};

// базовая страница
export const HomeRoute = ({ children }: Props) => {
  if (isAuthenticated()) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

// для маршрутов организации
export const ProtectedRouteOrganizations = ({ children }: Props) => {
  const { isOrganization, isLoading } = useProfile();

  const location = useLocation();

  // если пользователь не авторизован
  if (!isAuthenticated()) {
    return redirectToLogin(location);
  }

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  // если у пользователя нет организации
  if (!isOrganization) {
    return <Navigate to={ROUTES.ORGANIZATION.PROFILE} replace />;
  }

  return <>{children}</>;
};

// для маршрутов организации, у которых ещё не одобрили заявку
export const ProtectedRouteOrganizationsRequest = ({ children }: Props) => {
  const { isOrganizationRequest, isLoading } = useProfile();

  // если пользователь не авторизован
  const location = useLocation();

  if (!isAuthenticated()) {
    return redirectToLogin(location);
  }

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  // если у пользователя нет заявки
  if (!isOrganizationRequest) {
    return <Navigate to={ROUTES.ORGANIZATION.PROFILE} replace />;
  }

  return <>{children}</>;
};

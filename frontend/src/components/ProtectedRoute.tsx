import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/tokenService";
import { ROUTES } from "../constants/routes";

import { useProfile } from "../hooks/useOrganizationProfileAAAA";


interface Props {
  children: React.ReactNode;
}


// необходима только авторизация
export const ProtectedRoute = ({ children }: Props) => {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.USER.LOGIN} replace />;
  }

  return <>{children}</>;
};

// базовая страница пользователя
export const HomeRouteUsers = ({ children }: Props) => {
  if (isAuthenticated()) {
    return <Navigate to={ROUTES.USER.PROFILE} replace />;
  }

  return <>{children}</>;
};

/*export const ProtectedRoute = ({ children }: Props) => {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};*/




// HomeRouteUsers ProtectedRouteUsers
// HomeRouteOrganizations ProtectedRouteOrganizations ProtectedRouteOrganizationsRequest



// базовая страница организаций
export const HomeRouteOrganizations = ({ children }: Props) => {

  // если пользователь авторизован
  if (isAuthenticated()) {
    return <Navigate to={ROUTES.ORGANIZATION.PROFILE} replace />;
  }

  return <>{children}</>;
};

// для маршрутов организации
export const ProtectedRouteOrganizations = ({ children }: Props) => {
  const { isOrganization, isLoading } = useProfile()

  // если пользователь не авторизован
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.ORGANIZATION.LOGIN} replace />;
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
  const { isOrganizationRequest, isLoading } = useProfile()

  // если пользователь не авторизован
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.ORGANIZATION.LOGIN} replace />;
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
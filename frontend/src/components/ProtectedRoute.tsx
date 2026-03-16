import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/tokenService";
import { ROUTES } from "../constants/routes";


interface Props {
  children: React.ReactNode;
}

export const HomeRouteUsers = ({ children }: Props) => {
  if (isAuthenticated()) {
    return <Navigate to={ROUTES.USER.Profile} replace />;
  }

  return <>{children}</>;
};

export const ProtectedRoute = ({ children }: Props) => {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

export const ProtectedRouteUsers = ({ children }: Props) => {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.USER.LOGIN} replace />;
  }

  return <>{children}</>;
};

export const ProtectedRouteOrganizations = ({ children }: Props) => {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.ORGANIZATION.LOGIN} replace />;
  }

  return <>{children}</>;
};
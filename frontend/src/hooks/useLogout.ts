import { authService } from "../api/authService";
import { tokenService } from "../api/tokenService";
import { useNavigation } from "./useNavigation";

export const useLogout = () => {
  const { goHome } = useNavigation();

  const logout = async () => {
    const refreshToken = tokenService.getRefreshToken();

    try {
      if (refreshToken) {
        await authService.logout({
          refresh_token: refreshToken
        });
      }
    } catch (e) {
      console.error("Logout error", e);
    }

    tokenService.clearTokens();
    goHome()
  };

  return { logout };
};
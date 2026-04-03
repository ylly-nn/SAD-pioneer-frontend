import { tokenService } from "./tokenService";
import { auth } from "./authService";

let refreshTimeout: number | null = null;

// ⏱ сколько заранее обновлять (например за 1 минуту)
const REFRESH_BEFORE_EXPIRY = 60 * 1000;

const scheduleRefresh = () => {
  const exp = tokenService.getAccessTokenExpiration();

  if (!exp) return;

  const now = Date.now();
  const timeout = exp - now - REFRESH_BEFORE_EXPIRY;

  if (timeout <= 0) {
    refreshToken();
    return;
  }

  refreshTimeout = window.setTimeout(() => {
    refreshToken();
  }, timeout);
};

export const refreshToken = async () => {
  try {
    const refreshToken = tokenService.getRefreshToken();

    if (!refreshToken) throw new Error("No refresh token");

    const response = await auth.refresh({
      refresh_token: refreshToken
    });

    tokenService.setTokens(
      response.access_token,
      response.refresh_token
    );

    // 🔁 заново планируем следующий refresh
    scheduleRefresh();

  } catch (e) {
    tokenService.clearTokens();
    window.location.href = "/";
  }
};

export const initAuth = () => {
  const token = tokenService.getAccessToken();

  if (!token) return;

  scheduleRefresh();
};

export const clearAuth = () => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }
};
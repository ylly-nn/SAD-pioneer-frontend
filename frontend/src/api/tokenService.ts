const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

type JwtPayload = {
  exp: number;
};

const parseJwt = (token: string): JwtPayload | null => {
  try {
    const base64 = token.split('.')[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

export const tokenService = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),

  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },

  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getAccessTokenExpiration: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return null;

    const payload = parseJwt(token);
    return payload?.exp ? payload.exp * 1000 : null;
  }
};

export const isAuthenticated = () => {
  return !!tokenService.getAccessToken();
};
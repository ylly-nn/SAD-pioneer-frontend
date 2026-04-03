import { type Role } from "../types/auth";

const ROLE_KEY = "role";

export const roleService = {
  setRole: (role: Role) => {
    localStorage.setItem(ROLE_KEY, role);
  },

  getRole: (): Role | null => {
    return localStorage.getItem(ROLE_KEY) as Role | null;
  },

  clearRole: () => {
    localStorage.removeItem(ROLE_KEY);
  },
};
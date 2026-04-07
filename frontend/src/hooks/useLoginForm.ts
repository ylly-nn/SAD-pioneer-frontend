import { useState } from "react";
import { auth } from "../api/authService";
import { useNavigation } from "./useNavigation";
import { tokenService } from "../api/tokenService";
import { roleService } from "../services/roleService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { goToUser, goToOrganization } = useNavigation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const role = roleService.getRole();

    if (!role) {
      setError("Не выбрана роль");
      return;
    }

    setIsLoading(true);

    try {
      const response = await auth.login(formData);

      tokenService.setTokens(response.access_token, response.refresh_token);

      if (from) {
        navigate(from);
        return;
      }

      if (role === "organization") {
        goToOrganization();
      } else {
        goToUser();
      }
    } catch (err: any) {
      tokenService.clearTokens();
      const message = getErrorMessage(err);
      setError(message);
      
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, error, isLoading, handleChange, handleSubmit };
};

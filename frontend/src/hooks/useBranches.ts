import { useEffect, useState } from "react";
import { type Branch } from "../types/organization";
import { branches as branchesApi } from "../api/organization";
import { useNavigation } from "./useNavigation";

export const useBranches = () => {
  const { goToOrganization } = useNavigation();

  const [items, setItems] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBranches = async () => {
    try {
      setIsLoading(true);
      const data = await branchesApi.getAll();
      setItems(data ?? []);
    } catch (err: any) {
      const message = err.response?.data?.message || "Ошибка загрузки данных";
      setError(message);

      if (err.response?.status === 403) {
        goToOrganization();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return {
    branches: items,
    isLoading,
    error,
    refetch: fetchBranches,
  };
};

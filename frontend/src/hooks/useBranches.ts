import { useEffect, useState } from "react";
import { type Branch } from "../types/organization";
import { branches as branchesApi } from "../api/organization";

export const useBranches = () => {

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

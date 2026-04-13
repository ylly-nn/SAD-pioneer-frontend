import { useEffect, useState } from "react";
import { organization, branches } from "../api/organization";
import type { Organization, Branch } from "../types/organization";

export const useOrganizationData = () => {
  const [org, setOrg] = useState<Organization | null>(null);
  const [branchesList, setBranchesList] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orgData, branchesData] = await Promise.all([
          organization.get(),
          branches.getAll(),
        ]);

        setOrg(orgData || null);
        setBranchesList(branchesData || []);
      } catch (error) {
        console.error("Ошибка загрузки данных организации:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    org,
    branchesCount: branchesList.length,
    loading,
  };
};
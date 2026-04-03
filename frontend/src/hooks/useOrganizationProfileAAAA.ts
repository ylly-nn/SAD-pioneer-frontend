import { useState, useEffect } from "react";
import { organization } from "../api/organization";
import { organizationRequest } from "../api/organizationRequest";

type ProfileStatus = "Verified" | "Pending" | "Empty" | null;

export const useProfile = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>(null);

  const [isOrganization, setIsOrganization] = useState(false);
  const [isOrganizationRequest, setIsOrganizationRequest] = useState(false);

  const checkProfile = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // есть организация?
      await organization.get();
      setProfileStatus("Verified");

      // для защиты маршрутов
      setIsOrganization(true);

    } catch (err: any) {
      // есть заявка?
      const statusCode = err.response?.status;

      if (statusCode === 403) {
      setError(null);
      }

      try {
        await organizationRequest.get();
        setProfileStatus("Pending");

        // для защиты маршрутов
        setIsOrganizationRequest(true);

      } catch (err: any) {
        setProfileStatus("Empty");

        const statusCode = err.response?.status;
        if (statusCode === 403) {
        setError(null);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkProfile();
  }, []);

  return {
    error,
    isLoading,
    profileStatus,
    checkProfile,
    isOrganization,
    isOrganizationRequest
  };
};
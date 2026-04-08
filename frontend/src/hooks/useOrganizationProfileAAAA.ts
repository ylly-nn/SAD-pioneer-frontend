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

  const [requestStatus, setRequestStatus] = useState<string | null>(null);

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
        const request = await organizationRequest.get();

        setProfileStatus("Pending");
        setRequestStatus(request.status);

        // для защиты маршрутов
        setIsOrganizationRequest(true);

      } catch (err: any) {
        setProfileStatus("Empty");
        setRequestStatus(null);

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
    isOrganizationRequest,
    requestStatus
  };
};
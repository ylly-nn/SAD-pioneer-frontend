import { useState, useEffect } from "react";
import { organization } from "../api/organization";
import { organizationRequest } from "../api/organizationRequest";

type ProfileStatus = "Verified" | "Pending" | "Empty" | null;

export const useProfile = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>(null);

  const checkProfile = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // есть организация?
      await organization.get();
      setProfileStatus("Verified");
    } catch (err: any) {
      // есть заявка?
      try {
        await organizationRequest.get();
        setProfileStatus("Pending");
      } catch (err: any) {
        setProfileStatus("Empty");
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
    checkProfile
  };
};
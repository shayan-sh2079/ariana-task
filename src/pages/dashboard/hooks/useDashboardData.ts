import { useLoaderData, useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { signOut } from "#/services/auth.ts";
import Cookies from "js-cookie";
import { ACCESS_TKN_KEY } from "#/constants/auth.ts";
import { getProfile } from "#/services/dashboard.ts";

export default function useDashboardData() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { profile, accessTkn } = useLoaderData() as {
    profile: Awaited<ReturnType<typeof getProfile>>;
    accessTkn: string;
  };
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let fullName = "";
  if (profile?.first_name && profile.last_name) {
    fullName = profile.first_name + " " + profile.last_name;
  } else if (profile?.first_name) {
    fullName = profile.first_name;
  } else if (profile?.last_name) {
    fullName = profile.last_name;
  }

  const logoutHandler = useCallback(async () => {
    setIsLoading(true);
    const isSuccessful = await signOut(accessTkn);
    if (isSuccessful) {
      Cookies.remove(ACCESS_TKN_KEY);
      navigate("/auth/login");
    }
    setIsLoading(false);
  }, [accessTkn, navigate]);

  return {
    isLoading,
    fullName,
    username: profile?.username,
    avatar: profile?.avatar,
    logoutHandler,
    isLogoutModalOpen,
    openModalHandler: () => setIsLogoutModalOpen(true),
    closeModalHandler: () => setIsLogoutModalOpen(false),
  };
}

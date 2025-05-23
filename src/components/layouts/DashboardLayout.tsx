import Cookies from "js-cookie";
import { ACCESS_TKN_KEY } from "#/constants/auth.ts";
import { Outlet, redirect } from "react-router";
import { getProfile } from "#/services/auth.ts";
import Button from "#/components/ui/Button.tsx";
import useDashboardData from "#/pages/dashboard/hooks/useDashboardData.ts";
import { Icon } from "@iconify/react";
import { lazy } from "react";
import queryClient from "#/services/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import LogoIcon from "#/components/icons/LogoIcon.tsx";

const SignOutModalLazy = lazy(
  () => import("#/pages/dashboard/components/SignOutModal.tsx"),
);

export const loader = async () => {
  const accessTkn = Cookies.get(ACCESS_TKN_KEY);
  if (!accessTkn) {
    return redirect("/auth/login");
  }

  const profile = await queryClient.fetchQuery({
    queryKey: ["profile"],
    queryFn: async () => await getProfile(accessTkn),
  });

  return { profile, accessTkn };
};

export function Component() {
  const {
    avatar,
    fullName,
    logoutHandler,
    isLoading,
    username,
    isLogoutModalOpen,
    openModalHandler,
    closeModalHandler,
  } = useDashboardData();

  return (
    <>
      <div className={"flex min-h-dvh"}>
        <aside
          className={
            "bg-primary-foreground fixed top-0 bottom-0 left-0 flex min-h-dvh w-60 flex-col justify-between border-r border-gray-400 px-2 pt-6 pb-8"
          }
        >
          <div className={"flex flex-col items-center"}>
            {avatar && (
              <img
                src={avatar}
                alt="profile"
                width={64}
                height={64}
                className={"mb-2 rounded-full"}
              />
            )}
            {fullName && (
              <p className={"font-geist text-[15px] font-bold"}>{fullName}</p>
            )}
            {username && (
              <p className={"font-geist text-[15px] text-gray-200"}>
                @{username}
              </p>
            )}
          </div>
          <Button color={"destructive"} onClick={openModalHandler}>
            <div className={"flex items-center justify-center gap-1"}>
              <Icon icon="mdi:exit-to-app" />
              <span>Logout</span>
            </div>
          </Button>
        </aside>
        <div className={"ml-60 flex grow flex-col"}>
          <header
            className={
              "bg-primary-foreground sticky top-0 z-10 h-13.5 w-full px-4 py-3"
            }
          >
            <LogoIcon />
          </header>
          <main className={"flex grow flex-col"}>
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </main>
        </div>
      </div>
      {isLogoutModalOpen && (
        <SignOutModalLazy
          onConfirm={logoutHandler}
          isLoading={isLoading}
          onClose={closeModalHandler}
        />
      )}
    </>
  );
}

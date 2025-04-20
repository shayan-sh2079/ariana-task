import { Outlet } from "react-router";
import LogoIcon from "#/components/icons/LogoIcon.tsx";

export function Component() {
  return (
    <div className={"flex min-h-dvh w-full items-center p-5"}>
      <section
        className={
          "mx-auto w-sm rounded-lg border border-gray-400 p-6 shadow-sm"
        }
      >
        <LogoIcon className={"mx-auto mb-12 h-16 w-62"} />
        <Outlet />
      </section>
    </div>
  );
}

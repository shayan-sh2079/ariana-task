import { Outlet } from "react-router";

export function Component() {
  return (
    <div className={"flex min-h-dvh w-full items-center p-5"}>
      <section
        className={
          "mx-auto w-sm rounded-lg border border-gray-400 p-6 shadow-sm"
        }
      >
        <h1 className={"text-destructive mb-12 text-center text-4xl font-bold"}>
          ariana
        </h1>
        <Outlet />
      </section>
    </div>
  );
}

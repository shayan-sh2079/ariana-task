import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "#/components/layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "auth",
        lazy: () => import("#/components/layouts/AuthLayout.tsx"),
        children: [
          {
            path: "sign-up",
            lazy: () => import("#/pages/auth/SignUp.tsx"),
          },
          {
            path: "login",
            lazy: () => import("#/pages/auth/SignIn.tsx"),
          },
        ],
      },
      {
        path: "dashboard",
        lazy: () => import("#/components/layouts/DashboardLayout.tsx"),
        children: [
          {
            path: "",
            lazy: () => import("#/pages/dashboard/MainPage.tsx"),
          },
        ],
      },
    ],
  },
]);

export default router;

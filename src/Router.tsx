import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout";
import ProtectedLayout from "./components/common/ProtectedLayout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        Component: lazy(() => import("./pages/Leaderboard")),
      },
      {
        path: "/verify-email",
        Component: lazy(() => import("./pages/VerifyEmail/VerifyEmailPage")),
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        Component: lazy(() => import("./pages/Compare")),
      },
      {
        path: "/compare",
        Component: lazy(() => import("./pages/Compare")),
      },
      {
        path: "/leaderboard",
        Component: lazy(() => import("./pages/Leaderboard")),
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

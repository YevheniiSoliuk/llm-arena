import { lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/common/Layout";
import ProtectedLayout from "./components/common/ProtectedLayout";
import { Auth0Provider } from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import { CONFIG } from "./config";
import Loading from "./components/common/Loading";

const Router = () => {
  const navigate = useNavigate();

  return (
    <Auth0Provider
      domain={CONFIG.AUTH0_DOMAIN}
      clientId={CONFIG.AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
      onRedirectCallback={(appState) => {
        const targetUrl = appState?.returnTo || window.location.pathname;
        window.history.pushState({}, document.title, targetUrl);
        navigate(targetUrl);
      }}
    >
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index Component={lazy(() => import("./pages/Leaderboard").then(module => ({ default: module.Leaderboard })))} />
            <Route path="/verify-email" Component={lazy(() => import("./pages/VerifyEmail/VerifyEmailPage"))} />
            <Route path="/leaderboard" Component={lazy(() => import("./pages/Leaderboard").then(module => ({ default: module.Leaderboard })))} />
            <Route element={<ProtectedLayout />}>
              <Route path="/compare" Component={lazy(() => import("./pages/Compare"))} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </Auth0Provider>
  );
};

export default Router;

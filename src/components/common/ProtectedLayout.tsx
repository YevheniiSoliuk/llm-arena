import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Loading from "./Loading";

const ProtectedLayout = () => {
  const { isAuthenticated, loginWithRedirect, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!isLoading && !isAuthenticated) {
        try {
          await getAccessTokenSilently({ cacheMode: 'off' });
        } catch (err) {
          loginWithRedirect({
            appState: { returnTo: window.location.pathname }
          });
        }
      }
    };

    checkAndRefreshToken();
  }, [isLoading, isAuthenticated, getAccessTokenSilently, loginWithRedirect]);

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <div className="flex justify-center items-center h-screen">Redirecting to login...</div>;
};

export default ProtectedLayout;
import { Suspense, useEffect } from "react";
import Router from "./Router";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "./components/common/Loading";
import { CONFIG } from "./config";
import { ToastContainer } from "react-toastify";
import { addModelsToDb } from "./utils/addModelsToDb";

const queryClient = new QueryClient();

function App() {
  // useEffect(() => {
  //   addModelsToDb();
  // }, []);
  return (
    <Auth0Provider
      domain={CONFIG.AUTH0_DOMAIN}
      clientId={CONFIG.AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={(appState?: AppState, user?: User) => {
        console.log(user);
        console.log(appState);
        window.history.replaceState(
          {},
          document.title,
          appState?.returnTo || window.location.pathname
        );
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <Router />
          <ToastContainer />
        </Suspense>
      </QueryClientProvider>
    </Auth0Provider>
  );
}

export default App;

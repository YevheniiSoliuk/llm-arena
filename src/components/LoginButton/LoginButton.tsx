import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      className={'py-5'}
      onClick={() => loginWithRedirect({
        appState: { returnTo: window.location.pathname }
      })}
    >
      Log In
    </Button>
  );
};

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    localStorage.clear();
  }

  return (
    <Button className='py-5' onClick={handleLogout}>Log Out</Button>
  );
};

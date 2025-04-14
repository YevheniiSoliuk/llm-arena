import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { BottomTabNav } from "../BottomTabNav";

const ProtectedLayout = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
    return;
  }

  return (
    <div className='w-full min-h-screen dark:bg-background'>
      <Header />
      <div className='w-full min-h-screen pt-[60px] pb-[80px] sm:pb-0'>
        <Outlet />
      </div>
      <BottomTabNav />
    </div>
  );
};

export default ProtectedLayout;

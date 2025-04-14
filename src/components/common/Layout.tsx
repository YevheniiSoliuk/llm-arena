import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import AuthErrorHandler from "./ErrorHandler";
import { BottomTabNav } from "../BottomTabNav";

const Layout = () => {
  return (
    <>
      <AuthErrorHandler />
      <div className='w-full min-h-screen dark:bg-background relative'>
        <Header />
        <div className='w-full min-h-screen pt-[60px] pb-[80px] sm:pb-0'>
          <Outlet />
        </div>
        <BottomTabNav />
      </div>
    </>
  );
};

export default Layout;

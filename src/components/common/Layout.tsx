import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import AuthErrorHandler from "./ErrorHandler";

const Layout = () => {
  return (
    <>
      <AuthErrorHandler />
      <div className='w-full h-screen dark:bg-background'>
        <Header />
        <div className='w-full min-h-screen pt-[60px]'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;

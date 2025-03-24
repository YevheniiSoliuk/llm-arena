import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import AuthErrorHandler from "./ErrorHandler";

const Layout = () => {
  return (
    <>
      <AuthErrorHandler />
      <div className='w-full dark:bg-background'>
        <Header />
        <div className='w-full pt-10'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div className='w-full dark:bg-background'>
      <Header />
      <div className='pt-20'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

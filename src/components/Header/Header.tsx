import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../LoginButton";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { links } from "./constants";
import NavigationItem from "./NavigationItem";
import { LogoutButton } from "../LogoutButton";
import { Profile } from "../Profile";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo_white.svg";

const Header = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { pathname } = useLocation();
  const isEmailVerificationPage = pathname === "/verify-email";

  const authenticationButton = useMemo(() => {
    if (isAuthenticated) {
      return (
        <>
          <NavigationMenu className='max-w-none ml-auto mr-auto hidden sm:block'>
            <NavigationMenuList className='gap-4'>
              {links.map((link) => (
                <NavigationItem key={link.to} link={link} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className='flex w-fit items-center justify-end gap-4'>
            {isLoading ? (
              <Skeleton className='h-[45px] w-[250px] rounded-xl' />
            ) : (
              <>
                <Profile />
                <LogoutButton />
              </>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavigationMenu className='max-w-none w-[90%] hidden sm:block'>
            <NavigationMenuList className='gap-4'>
              <NavigationItem link={{ text: "Leaderboard", to: "/" }} />
            </NavigationMenuList>
          </NavigationMenu>
          <div className='flex w-[10%] items-center justify-end gap-4'>
            {isLoading ? (
              <Skeleton className='h-[45px] w-[250px] rounded-xl' />
            ) : (
              <LoginButton />
            )}
          </div>
        </>
      );
    }
  }, [isLoading, isAuthenticated]);

  if (isEmailVerificationPage) {
    return null;
  }

  return (
    <div className='fixed left-0 top-0 z-20 flex w-full items-center p-4 bg-background'>
      <div className='flex w-[10%] items-center justify-start gap-4 pl-4'>
        <div className="w-[40px] h-[40px]">
          <img src={logo} alt="Models competitive arena"/>
        </div>
      </div>
      {authenticationButton}
    </div>
  );
};

export default Header;

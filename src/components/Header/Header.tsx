import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../LoginButton";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { links } from "./constants";
import NavigationItem from "./NavigationItem";
import { LogoutButton } from "../LogoutButton";
import { Profile } from "../Profile";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";

const Header = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const authenticationButton = useMemo(() => {
    if (isLoading) {
      return <Skeleton className='h-[45px] w-[250px] rounded-xl' />;
    }

    if (isAuthenticated) {
      return (
        <>
          <NavigationMenu className='min-w-[30%]'>
            <NavigationMenuList className='gap-4'>
              {links.map((link) => (
                <NavigationItem key={link.to} link={link} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className='flex w-full items-center justify-end gap-4'>
            <Profile />
            <LogoutButton />
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavigationMenu className='min-w-[30%]'>
            <NavigationMenuList className='gap-4'>
              <NavigationItem link={{ text: "Leaderboard", to: "/" }} />
            </NavigationMenuList>
          </NavigationMenu>
          <div className='flex w-full items-center justify-end gap-4'>
            <LoginButton />
          </div>
        </>
      );
    }
  }, [isLoading, isAuthenticated]);

  return (
    <div className='fixed left-0 top-0 z-20 flex w-full items-center p-2 dark:bg-background'>
      <div className='flex w-full items-center justify-start gap-4 pl-4'>
        <h2 className='text-2xl font-bold'>2LMA.</h2>
      </div>
      {authenticationButton}
    </div>
  );
};

export default Header;

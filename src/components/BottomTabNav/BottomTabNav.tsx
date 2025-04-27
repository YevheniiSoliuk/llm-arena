import { cn } from "@/lib/utils";
import { links } from "../Header/constants";
import NavigationItem from "../Header/NavigationItem";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import "./styles.css";
import { useAuth0 } from "@auth0/auth0-react";

export const BottomTabNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex w-full fixed bottom-4 items-center justify-center sm:hidden">
      <div className="w-[95%] flex justify-center bg-background p-2 border-[1px] border-foreground rounded-md shadow-[2px_2px_15px_rgba(0,0,0,0.5)]">
        <NavigationMenu className={cn('nav-menu', 'w-full max-w-none flex')}>
          <NavigationMenuList className='flex justify-between'>
            {isAuthenticated
              ? links.map((link) => (
                <NavigationItem key={link.to} link={link} />
              ))
              : <NavigationItem link={{ text: "Leaderboard", to: "/" }} />
            }
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

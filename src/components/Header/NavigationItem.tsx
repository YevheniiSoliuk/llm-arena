import { NavigationMenuItem } from "../ui/navigation-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationLink } from "./types";

type NavigationItemProps = {
  link: NavigationLink;
};

const NavigationItem = ({ link }: NavigationItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === link.to;
  const isMainPage = location.pathname === '/' && link.to.includes("leaderboard");
  const isActivePage = isActive || isMainPage;

  return (
    <NavigationMenuItem
      className={`max-sm:w-full group/item px-4 py-2 transition-all ${isActivePage ? "bg-foreground rounded-sm sm:rounded-none sm:bg-background sm:border-b-2 sm:border-foreground" : `cursor-pointer border-b-2 border-transparent sm:hover:border-b-2 sm:hover:border-foreground`}`}
      onClick={() => navigate(link.to)}
    >
      <p className={`${isActivePage ? `cursor-default text-secondary sm:text-primary text-center` : `text-primary group-hover/item:text-primary text-center`}`}>
        {link.text}
      </p>
    </NavigationMenuItem>
  );
};

export default NavigationItem;

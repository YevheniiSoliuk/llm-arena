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
      className={`group/item px-4 py-2 transition-all ${isActivePage ? "border-b-2 border-foreground" : `cursor-pointer border-b-2 border-transparent hover:border-b-2 hover:border-foreground`}`}
      onClick={() => navigate(link.to)}
    >
      <p className={`${isActivePage ? `cursor-default text-primary` : `text-primary group-hover/item:text-primary`}`}>
        {link.text}
      </p>
    </NavigationMenuItem>
  );
};

export default NavigationItem;

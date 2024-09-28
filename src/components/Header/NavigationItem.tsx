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

  return (
    <NavigationMenuItem
      className={`border-2xl group/item rounded-lg border px-4 py-2 ${isActive ? "border-slate-800 bg-primary" : `hover:border-link-hover cursor-pointer border-foreground bg-background`}`}
      onClick={() => navigate(link.to)}
    >
      <p
        className={`${isActive ? `cursor-default text-secondary hover:text-secondary` : `group-hover/item:text-link-hover text-primary`}`}
      >
        {link.text}
      </p>
    </NavigationMenuItem>
  );
};

export default NavigationItem;
